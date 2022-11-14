/**
 * The `PatternBuilder` module contains utilities to construct regular expressions,
 * fast-check arbitraries, and (potentially) other things that match some pattern. These
 * `Pattern`s can be used directly or via the `pattern` addition to the `Schemable`
 * interface. They can also be composed together to create more readable descriptions of a
 * regular expression.
 *
 * @since 1.0.0
 * @example
 *   import * as PB from 'schemata-ts/PatternBuilder'
 *   import { pipe } from 'fp-ts/function'
 *
 *   const digit = PB.characterClass(false, ['0', '9'])
 *
 *   const areaCode = pipe(
 *     pipe(PB.char('('), PB.then(PB.times(3)(digit)), PB.then(PB.char(')'))),
 *     PB.or(PB.times(3)(digit)),
 *     PB.subgroup,
 *   )
 *
 *   const prefix = PB.times(3)(digit)
 *
 *   const lineNumber = PB.times(4)(digit)
 *
 *   export const usPhoneNumber = pipe(
 *     areaCode,
 *     PB.then(PB.char('-')),
 *     PB.then(prefix),
 *     PB.then(PB.char('-')),
 *     PB.then(lineNumber),
 *   )
 */
import * as fc from 'fast-check'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RA from 'fp-ts/ReadonlyArray'
import { match, matchOn } from './internal/match'

// Breakdown of RegExp from https://262.ecma-international.org/5.1/#sec-15.10
// Slightly adapted

/** @internal */
export type Pattern = Disjunction | TermSequence | Term

type Disjunction = { tag: 'disjunction'; left: Pattern; right: TermSequence | Term }

type TermSequence = { tag: 'termSequence'; terms: ReadonlyArray<Term> }

type Term = Atom | QuantifiedAtom

type QuantifiedAtom = { tag: 'quantifiedAtom'; atom: Atom } & (
  | { kind: 'star'; greedy: boolean }
  | { kind: 'plus'; greedy: boolean }
  | { kind: 'question' }
  | { kind: 'exactly'; count: number }
  | { kind: 'minimum'; min: number }
  | { kind: 'between'; min: number; max: number }
)

type CharacterClass = {
  tag: 'atom'
  kind: 'characterClass'
  exclude: boolean
  ranges: ReadonlyArray<{ lower: number; upper: number }>
}

type Atom =
  | CharacterClass
  | ({ tag: 'atom' } & (
      | { kind: 'character'; char: string }
      | { kind: 'anything' }
      | { kind: 'subgroup'; subpattern: Pattern }
    ))

type Char = string

const matchK = matchOn('kind')

/**
 * A pattern of a single, specific character
 *
 * @since 1.0.0
 */
export const char: (c: Char) => Atom = c => ({ tag: 'atom', kind: 'character', char: c })

/**
 * A pattern of any single character
 *
 * @since 1.0.0
 */
export const anything: Atom = { tag: 'atom', kind: 'anything' }

const convertRanges: (
  ranges: ReadonlyArray<readonly [Char, Char] | Char | readonly [number, number]>,
) => CharacterClass['ranges'] = RA.map(range => {
  if (typeof range === 'string') {
    return { lower: range.charCodeAt(0), upper: range.charCodeAt(0) } as const
  }
  const [c1, c2] = range
  const lower = typeof c1 === 'string' ? c1.charCodeAt(0) : c1
  const upper = typeof c2 === 'string' ? c2.charCodeAt(0) : c2
  return { lower, upper } as const
})

/**
 * A pattern of a single character that matches a list of characters or ranges. The ranges
 * can either be charcter to character (e.g. `['A', 'Z']`) or number to number (e.g.
 * `[0x3040, 0x309F]` which matches the Hiragana range in Unicode.)
 *
 * If the first argument (`exclude`) is true, then the pattern is a single character that
 * is _not_ in the given ranges.
 *
 * @since 1.0.0
 */
export const characterClass: (
  exclude: boolean,
  ...ranges: ReadonlyArray<readonly [Char, Char] | Char | readonly [number, number]>
) => CharacterClass = (exclude, ...ranges) => ({
  tag: 'atom',
  kind: 'characterClass',
  exclude,
  ranges: convertRanges(ranges),
})

/**
 * Turn a `Pattern` into an `Atom`. In regular expression terms, this is wrapping the
 * pattern in parentheses.
 *
 * @since 1.0.0
 */
export const subgroup: (subpattern: Pattern) => Atom = subpattern =>
  subpattern.tag === 'atom'
    ? subpattern
    : {
        tag: 'atom',
        kind: 'subgroup',
        subpattern,
      }

/**
 * Repeat an `Atom` any number of times (including zero).
 *
 * @since 1.0.0
 */
export const anyNumber: (opts?: { greedy: boolean }) => (atom: Atom) => QuantifiedAtom =
  (opts = { greedy: false }) =>
  atom => ({
    tag: 'quantifiedAtom',
    atom,
    greedy: opts.greedy,
    kind: 'star',
  })

/**
 * Repeat an `Atom` any number of times, but at least once.
 *
 * @since 1.0.0
 */
export const atLeastOne: (opts?: { greedy: boolean }) => (atom: Atom) => QuantifiedAtom =
  (opts = { greedy: false }) =>
  atom => ({
    tag: 'quantifiedAtom',
    atom,
    greedy: opts.greedy,
    kind: 'plus',
  })

/**
 * Make an `Atom` optional -- it can occur in the pattern once or not at all.
 *
 * @since 1.0.0
 */
export const maybe: (atom: Atom) => QuantifiedAtom = atom => ({
  tag: 'quantifiedAtom',
  atom,
  greedy: false,
  kind: 'question',
})

/**
 * Repeat an `Atom` an exact number of times. (Aliased to `exactly` for better readability
 * in some situations)
 *
 * @since 1.0.0
 */
export const times: (count: number) => (atom: Atom) => QuantifiedAtom =
  count => atom => ({
    tag: 'quantifiedAtom',
    atom,
    greedy: true,
    kind: 'exactly',
    count,
  })

/**
 * Alias of `times`
 *
 * @since 1.0.0
 */
export const exactly: (count: number) => (atom: Atom) => QuantifiedAtom = times

/**
 * Repeat an `Atom` at least some number of times. For example, `atLeast(3)(char('a'))`
 * represents `aaa`, `aaaaaa`, and `aaaaaaaaaaaaaaaaaaaaaaaa` but not `aa`
 *
 * @since 1.0.0
 */
export const atLeast: (min: number) => (atom: Atom) => QuantifiedAtom = min => atom => ({
  tag: 'quantifiedAtom',
  atom,
  kind: 'minimum',
  min,
})

/**
 * Repeat an `Atom` some number of times in the given range, inclusive.
 *
 * @since 1.0.0
 */
export const between: (min: number, max: number) => (atom: Atom) => QuantifiedAtom =
  (min, max) => atom => ({
    tag: 'quantifiedAtom',
    atom,
    greedy: true,
    kind: 'between',
    min,
    max,
  })

/**
 * Create a disjunction of two patterns. In regular expression terms, this corresponds to `|`.
 *
 * @since 1.0.0
 */
export const or: (
  right: TermSequence | Atom | QuantifiedAtom,
) => (left: Pattern) => Disjunction = right => left => ({
  tag: 'disjunction',
  left,
  right,
})

const getTerms: (termOrSeq: Term | TermSequence) => TermSequence['terms'] = match({
  termSequence: ({ terms }) => terms,
  atom: atom => [atom],
  quantifiedAtom: qatom => [qatom],
})

/**
 * Append a term or term sequence onto another.
 *
 * @since 1.0.0
 */
export const then: (
  term: Term | TermSequence,
) => (alt: TermSequence | Term) => TermSequence = term => alt => ({
  tag: 'termSequence',
  terms: [...getTerms(alt), ...getTerms(term)],
})

/**
 * Construct an `Atom` for a specific string.
 *
 * @since 1.0.0
 */
export const exactString: (s: string) => Atom = s =>
  subgroup({
    tag: 'termSequence',
    terms: s.split('').map(char),
  })

/**
 * Concatenate `Term`s
 *
 * @since 1.0.0
 */
export const sequence: (term: Term, ...terms: ReadonlyArray<Term>) => TermSequence = (
  term,
  ...terms
) => ({
  tag: 'termSequence',
  terms: [term, ...terms],
})

const repr = (n: number): string =>
  // < 32 -> control characters
  // 45 -> '-'.. seems like `/[--z]/` for example actually works, but looks weird.
  // 93 -> ']' which needs to be escaped
  // 94 -> '^' which might get parsed as class exclusion marker, so escape just in case
  // 127 -> del
  // >127 -> outside normal ascii range. escape 'em
  n < 32 || n === 45 || n === 93 || n === 94 || n >= 127
    ? n > 255
      ? `\\u${n.toString(16).padStart(4, '0')}`
      : `\\x${n.toString(16).padStart(2, '0')}`
    : String.fromCharCode(n)

const regexStringFromAtom: (atom: Atom) => string = matchK({
  anything: () => '.',
  character: ({ char }) =>
    char === '['
      ? '\\['
      : char === ']'
      ? '\\]'
      : char === '.'
      ? '\\.'
      : char === '('
      ? '\\('
      : char === ')'
      ? '\\)'
      : char === '+'
      ? '\\+'
      : char,
  characterClass: ({ exclude, ranges }) =>
    pipe(
      RNEA.fromReadonlyArray(ranges),
      O.chain(O.fromPredicate(s => s.length === 1)),
      O.chain(([{ lower, upper }]) =>
        lower === 48 && upper === 57 ? O.some('\\d') : O.none,
      ),
      O.getOrElse(
        () =>
          `[${exclude ? '^' : ''}${ranges
            .map(({ lower, upper }) =>
              lower === upper ? repr(lower) : `${repr(lower)}-${repr(upper)}`,
            )
            .join('')}]`,
      ),
    ),
  subgroup: ({ subpattern }) => `(${regexStringFromPattern(subpattern)})`,
})

const regexStringFromQuantifiedAtom: (quantifiedAtom: QuantifiedAtom) => string = matchK({
  star: ({ atom, greedy }) => `${regexStringFromAtom(atom)}*${greedy ? '' : '?'}`,
  plus: ({ atom, greedy }) => `${regexStringFromAtom(atom)}+${greedy ? '' : '?'}`,
  question: ({ atom }) => `${regexStringFromAtom(atom)}?`,
  exactly: ({ atom, count }) => `${regexStringFromAtom(atom)}{${count}}`,
  between: ({ atom, min, max }) => `${regexStringFromAtom(atom)}{${min},${max}}`,
  minimum: ({ atom, min }) => `${regexStringFromAtom(atom)}{${min},}`,
})

const regexStringFromTerm: (term: Term) => string = match({
  atom: regexStringFromAtom,
  quantifiedAtom: regexStringFromQuantifiedAtom,
})

const regexStringFromPattern: (pattern: Pattern) => string = match({
  atom: regexStringFromAtom,
  disjunction: ({ left, right }) =>
    `${regexStringFromPattern(left)}|${regexStringFromPattern(right)}`,
  quantifiedAtom: regexStringFromQuantifiedAtom,
  termSequence: ({ terms }) => terms.map(regexStringFromTerm).join(''),
})

/**
 * Construct a regular expression (`RegExp`) from a given `Pattern`.
 *
 * @since 1.0.0
 */
export const regexFromPattern = (pattern: Pattern, caseInsensitive = false): RegExp =>
  new RegExp(`^(${regexStringFromPattern(pattern)})$`, caseInsensitive ? 'i' : '')

/** @internal */
export const arbitraryFromAtom: (atom: Atom) => fc.Arbitrary<string> = matchK({
  anything: fc.char,
  character: ({ char }) => fc.constant(char),
  characterClass: ({ exclude, ranges }) =>
    (exclude
      ? fc
          .integer({ min: 1, max: 0xffff })
          .filter(i => ranges.every(({ lower, upper }) => i > upper || i < lower))
      : fc.oneof(
          ...ranges.map(({ lower, upper }) => fc.integer({ min: lower, max: upper })),
        )
    ).map(charCode => String.fromCharCode(charCode)),
  subgroup: ({ subpattern }) => arbitraryFromPattern(subpattern),
})

/** @internal */
export const arbitraryFromQuantifiedAtom: (
  quantifiedAtom: QuantifiedAtom,
) => fc.Arbitrary<string> = matchK({
  star: ({ atom }) => fc.array(arbitraryFromAtom(atom)).map(strs => strs.join('')),
  plus: ({ atom }) =>
    fc.array(arbitraryFromAtom(atom), { minLength: 1 }).map(strs => strs.join('')),
  question: ({ atom }) =>
    fc
      .array(arbitraryFromAtom(atom), { minLength: 0, maxLength: 1 })
      .map(strs => strs.join('')),
  exactly: ({ atom, count }) =>
    fc
      .array(arbitraryFromAtom(atom), { minLength: count, maxLength: count })
      .map(strs => strs.join('')),
  between: ({ atom, min, max }) =>
    fc
      .array(arbitraryFromAtom(atom), { minLength: min, maxLength: max })
      .map(strs => strs.join('')),
  minimum: ({ atom, min }) =>
    fc.array(arbitraryFromAtom(atom), { minLength: min }).map(strs => strs.join('')),
})

const arbitraryFromTerm: (term: Term) => fc.Arbitrary<string> = match({
  atom: arbitraryFromAtom,
  quantifiedAtom: arbitraryFromQuantifiedAtom,
})

const chainConcatAll: (fcs: ReadonlyArray<fc.Arbitrary<string>>) => fc.Arbitrary<string> =
  RA.foldLeft(
    () => fc.constant(''),
    (head, tail) =>
      head.chain(headStr => chainConcatAll(tail).map(tailStr => headStr + tailStr)),
  )

/**
 * Construct a `fast-check` `Arbitrary` instance from a given `Pattern`.
 *
 * @since 1.0.0
 */
export const arbitraryFromPattern: (pattern: Pattern) => fc.Arbitrary<string> = match({
  atom: arbitraryFromAtom,
  disjunction: ({ left, right }) =>
    fc.oneof(arbitraryFromPattern(left), arbitraryFromPattern(right)),
  quantifiedAtom: arbitraryFromQuantifiedAtom,
  termSequence: ({ terms }) => pipe(terms.map(arbitraryFromTerm), chainConcatAll),
})

/**
 * Modify a character class with more ranges, or combine two character classes together.
 *
 * @since 1.0.0
 */
export const and: {
  (...ranges: ReadonlyArray<readonly [Char, Char] | Char | readonly [number, number]>): (
    cc: CharacterClass,
  ) => CharacterClass
  (ccb: CharacterClass): (cca: CharacterClass) => CharacterClass
} =
  (
    first,
    ...addl: ReadonlyArray<readonly [Char, Char] | Char | readonly [number, number]>
  ) =>
  cc => ({
    tag: 'atom',
    kind: 'characterClass',
    exclude: cc.exclude,
    ranges: cc.ranges.concat(
      typeof first === 'string' || first instanceof Array
        ? convertRanges([first, ...addl])
        : first.ranges,
    ),
  })

/**
 * Invert a character class
 *
 * @since 1.0.0
 */
export const non: (cc: CharacterClass) => CharacterClass = cc => ({
  ...cc,
  exclude: !cc.exclude,
})

/**
 * Any upper case letter in ASCII. See [POSIX
 * equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)
 *
 * @since 1.0.0
 */
export const upper: CharacterClass = characterClass(false, ['A', 'Z'])

/**
 * Any lower case letter in ASCII. See [POSIX
 * equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)
 *
 * @since 1.0.0
 */
export const lower: CharacterClass = characterClass(false, ['a', 'z'])

/**
 * Any upper or lower case letter in ASCII. See [POSIX
 * equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)
 *
 * @since 1.0.0
 */
export const alpha: CharacterClass = pipe(upper, and(lower))

/**
 * Any digit character in ASCII. See [POSIX
 * equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)
 *
 * @since 1.0.0
 */
export const digit: CharacterClass = characterClass(false, ['0', '9'])

/**
 * Any hexadecimal digit in ASCII. See [POSIX
 * equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)
 *
 * @since 1.0.0
 */
export const xdigit: CharacterClass = pipe(digit, and(['A', 'F'], ['a', 'f']))

/**
 * Alias of `xdigit`
 *
 * @since 1.0.0
 */
export const hexDigit: CharacterClass = xdigit

/**
 * Any alphanumeric character in ASCII. See [POSIX
 * equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)
 *
 * @since 1.0.0
 */
export const alnum: CharacterClass = pipe(alpha, and(digit))

/**
 * Any alphanumeric character in ASCII, or an underscore ('_'). See [POSIX
 * equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)
 *
 * @since 1.0.0
 */
export const word: CharacterClass = pipe(alnum, and('_'))

/**
 * Any punctuation character in ASCII. See [POSIX
 * equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)
 *
 * @since 1.0.0
 */
export const punct: CharacterClass = characterClass(
  false,
  ['!', '/'],
  [':', '@'],
  ['[', '_'],
  ['{', '~'],
)

/**
 * Space or tab. See [POSIX
 * equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)
 *
 * @since 1.0.0
 */
export const blank: CharacterClass = characterClass(false, ' ', '\t')

/**
 * Any whitespace character in ASCII. See [POSIX
 * equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)
 *
 * @since 1.0.0
 */
export const space: CharacterClass = pipe(blank, and('\n', '\r', '\f', '\v'))

/**
 * Any character in ASCII which has a graphical representation (i.e. not control
 * characters or space). See [POSIX
 * equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)
 *
 * @since 1.0.0
 */
export const graph: CharacterClass = characterClass(false, [33, 127])

/**
 * Any non-control character in ASCII. See [POSIX
 * equivalent](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX_Basic_Regular_Expressions#Character_classes)
 *
 * @since 1.0.0
 */
export const print: CharacterClass = pipe(graph, and(' '))

/**
 * Form a disjunction of multiple terms or term sequences.
 *
 * @since 1.0.0
 */
export const oneOf: (
  pattern: Pattern,
  ...terms: ReadonlyArray<Term | TermSequence>
) => Pattern = (pattern, ...patterns) =>
  pipe(
    patterns,
    RA.reduce(pattern, (ored, next) => pipe(ored, or(next))),
  )

/**
 * An empty pattern.
 *
 * @since 1.0.0
 */
export const empty: Pattern = { tag: 'atom', kind: 'character', char: '' }

// TODO @jacob-alford 22-11-13 Figure out how to test lines 602-604.  It's technically not unreachable during recursion
// istanbul ignore next
const integerRange_: (min: string, max: string, omitInitialZeros?: boolean) => Pattern = (
  min,
  max,
  omitInitialZeros = false,
) => {
  const curMinDigit = Number(min[0] ?? '0')
  const restMin = min.slice(1)
  const curMaxDigit = Number(max[0] ?? '9')
  const restMax = max.slice(1)

  const res =
    restMin.length === 0
      ? curMinDigit === curMaxDigit
        ? char(min)
        : characterClass(false, [min, max])
      : curMinDigit === curMaxDigit
      ? pipe(
          char(curMinDigit.toString(10)),
          then(subgroup(integerRange_(restMin, restMax))),
        )
      : oneOf(
          curMinDigit === 0 && omitInitialZeros
            ? integerRange_(restMin, restMax.replace(/./g, '9'), true)
            : pipe(
                char(curMinDigit.toString(10)),
                then(subgroup(integerRange_(restMin, restMin.replace(/./g, '9')))),
              ),
          ...(curMaxDigit - curMinDigit > 1
            ? [
                pipe(
                  characterClass(false, [
                    (curMinDigit + 1).toString(10),
                    (curMaxDigit - 1).toString(10),
                  ]),
                  then(sequence(empty, ...restMin.split('').map(() => digit))),
                ),
              ]
            : []),
          pipe(
            char(curMaxDigit.toString(10)),
            then(subgroup(integerRange_(restMin.replace(/./g, '0'), restMax))),
          ),
        )

  return res
}

/**
 * Create a pattern that matches integers in a given range. Does not currently handle
 * negatives (it returns an empty pattern if either number is negative)
 *
 * @since 1.0.0
 */
export const integerRange: (min: number, max: number) => Pattern = (min, max) => {
  if (
    min > max ||
    Number.isNaN(min) ||
    Number.isNaN(max) ||
    !Number.isInteger(min) ||
    !Number.isInteger(max) ||
    min < 0 ||
    max < 0
  ) {
    return empty
  }

  const maxStr = max.toString(10)
  const minStr = min.toString(10).padStart(maxStr.length, '0')
  return integerRange_(minStr, maxStr, true)
}

/**
 * The `PatternBuilder` module contains utilities to construct regular expressions,
 * fast-check arbitraries, and (potentially) other things that match some pattern. These
 * `Pattern`s can be used directly or via the `pattern` addition to the `Schemable`
 * interface. They can also be composed together to create more readable descriptions of a
 * regular expression.
 *
 * @since 1.0.0
 * @example
 *   import * as PB from 'schemable-ts-types/PatternBuilder'
 *   import { pipe } from 'fp-ts/function'
 *
 *   const digit = PB.characterClass(false, ['0', '9'])
 *
 *   const areaCode = pipe(
 *     pipe(PB.char('('), PB.then(PB.times(3)(digit)), PB.then(PB.char(')'))),
 *     PB.or(PB.times(3)(digit)),
 *     PB.subgroup
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
 *     PB.then(lineNumber)
 *   )
 */
import * as fc from 'fast-check'
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import { match, matchOn } from './internal/match'

// Breakdown of RegExp from https://262.ecma-international.org/5.1/#sec-15.10
// Slightly adapted

/** @internal */
export type Pattern = Disjunction | TermSequence | Term

type Disjunction = { tag: 'disjunction'; left: Pattern; right: TermSequence | Term }

type TermSequence = { tag: 'termSequence'; terms: ReadonlyArray<Term> }

type Term = Atom | QuantifiedAtom

type QuantifiedAtom = { tag: 'quantifiedAtom'; atom: Atom; greedy: boolean } & (
  | { kind: 'star' }
  | { kind: 'plus' }
  | { kind: 'question' }
  | { kind: 'exactly'; count: number }
  | { kind: 'minimum'; min: number }
  | { kind: 'between'; min: number; max: number }
)

type Atom = { tag: 'atom' } & (
  | { kind: 'character'; char: string }
  | { kind: 'anything' }
  | {
      kind: 'characterClass'
      exclude: boolean
      ranges: ReadonlyArray<{ lower: number; upper: number }>
    }
  | { kind: 'subgroup'; subpattern: Pattern }
)

type Char = string

const matchK = matchOn('kind')

/** @since 1.0.0 */
export const char = (c: Char): Atom => ({ tag: 'atom', kind: 'character', char: c })

/** @since 1.0.0 */
export const anything: Atom = { tag: 'atom', kind: 'anything' }

/** @since 1.0.0 */
export const characterClass = (
  exclude: boolean,
  ...ranges: ReadonlyArray<readonly [Char, Char] | Char | readonly [number, number]>
): Atom => ({
  tag: 'atom',
  kind: 'characterClass',
  exclude,
  ranges: ranges.map(range => {
    if (typeof range === 'string') {
      return { lower: range.charCodeAt(0), upper: range.charCodeAt(0) } as const
    }
    const [c1, c2] = range
    const lower = typeof c1 === 'string' ? c1.charCodeAt(0) : c1
    const upper = typeof c2 === 'string' ? c2.charCodeAt(0) : c2
    return { lower, upper } as const
  }),
})

/** @since 1.0.0 */
export const subgroup = (subpattern: Pattern): Atom => ({
  tag: 'atom',
  kind: 'subgroup',
  subpattern,
})

/** @since 1.0.0 */
export const anyNumber =
  (opts: { greedy: boolean } = { greedy: false }) =>
  (atom: Atom): QuantifiedAtom => ({
    tag: 'quantifiedAtom',
    atom,
    greedy: opts.greedy,
    kind: 'star',
  })

/** @since 1.0.0 */
export const atLeastOne =
  (opts: { greedy: boolean } = { greedy: false }) =>
  (atom: Atom): QuantifiedAtom => ({
    tag: 'quantifiedAtom',
    atom,
    greedy: opts.greedy,
    kind: 'plus',
  })

/** @since 1.0.0 */
export const maybe = (atom: Atom): QuantifiedAtom => ({
  tag: 'quantifiedAtom',
  atom,
  greedy: false,
  kind: 'question',
})

/** @since 1.0.0 */
export const times =
  (count: number) =>
  (atom: Atom): QuantifiedAtom => ({
    tag: 'quantifiedAtom',
    atom,
    greedy: true,
    kind: 'exactly',
    count,
  })

/** @since 1.0.0 */
export const atLeast =
  (min: number) =>
  (atom: Atom): QuantifiedAtom => ({
    tag: 'quantifiedAtom',
    atom,
    greedy: true,
    kind: 'minimum',
    min,
  })

/** @since 1.0.0 */
export const between =
  (min: number, max: number) =>
  (atom: Atom): QuantifiedAtom => ({
    tag: 'quantifiedAtom',
    atom,
    greedy: true,
    kind: 'between',
    min,
    max,
  })

/** @since 1.0.0 */
export const or =
  (right: TermSequence | Atom | QuantifiedAtom) =>
  (left: Pattern): Disjunction => ({
    tag: 'disjunction',
    left,
    right,
  })

/** @since 1.0.0 */
export const then =
  (term: Term) =>
  (alt: TermSequence | Term): TermSequence => ({
    tag: 'termSequence',
    terms: alt.tag === 'termSequence' ? [...alt.terms, term] : [alt, term],
  })

/** @since 1.0.0 */
export const exactString = (s: string): Atom =>
  subgroup({
    tag: 'termSequence',
    terms: s.split('').map(char),
  })

const repr = (n: number): string =>
  // < 32 -> control characters
  // 45 -> '-'.. seems like `/[--z]/` for example actually works, but looks weird.
  // 94 -> '^' which might get parsed as class exclusion marker, so escape just in case
  // 127 -> del
  // >127 -> outside normal ascii range. escape 'em
  n < 32 || n === 45 || n === 94 || n >= 127
    ? n > 255
      ? `\\u${n.toString(16).padStart(4, '0')}`
      : `\\x${n.toString(16).padStart(2, '0')}`
    : String.fromCharCode(n)

const regexStringFromAtom: (atom: Atom) => string = matchK({
  anything: () => '.',
  character: ({ char }) => char,
  characterClass: ({ exclude, ranges }) =>
    `[${exclude ? '^' : ''}${ranges
      .map(({ lower, upper }) => `${repr(lower)}-${repr(upper)}`)
      .join('')}]`,
  subgroup: ({ subpattern }) => `(${regexStringFromPattern(subpattern)})`,
})

const regexStringFromQuantifiedAtom: (quantifiedAtom: QuantifiedAtom) => string = matchK({
  star: ({ atom, greedy }) => `${regexStringFromAtom(atom)}*${greedy ? '' : '?'}`,
  plus: ({ atom, greedy }) => `${regexStringFromAtom(atom)}+${greedy ? '' : '?'}`,
  question: ({ atom }) => `${regexStringFromAtom(atom)}?`,
  exactly: ({ atom, count }) => `${regexStringFromAtom(atom)}{${count}}`,
  between: ({ atom, min, max, greedy }) =>
    `${regexStringFromAtom(atom)}{${min},${max}}${greedy ? '' : '?'}`,
  minimum: ({ atom, min, greedy }) =>
    `${regexStringFromAtom(atom)}{${min},}${greedy ? '' : '?'}`,
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

/** @since 1.0.0 */
export const regexFromPattern = (pattern: Pattern, caseInsensitive = false): RegExp =>
  new RegExp(`^${regexStringFromPattern(pattern)}$`, caseInsensitive ? 'i' : '')

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
          ...ranges.map(({ lower, upper }) => fc.integer({ min: lower, max: upper }))
        )
    ).map(charCode => String.fromCharCode(charCode)),
  subgroup: ({ subpattern }) => arbitraryFromPattern(subpattern),
})

/** @internal */
export const arbitraryFromQuantifiedAtom: (
  quantifiedAtom: QuantifiedAtom
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
      head.chain(headStr => chainConcatAll(tail).map(tailStr => headStr + tailStr))
  )

/** @since 1.0.0 */
export const arbitraryFromPattern: (pattern: Pattern) => fc.Arbitrary<string> = match({
  atom: arbitraryFromAtom,
  disjunction: ({ left, right }) =>
    fc.oneof(arbitraryFromPattern(left), arbitraryFromPattern(right)),
  quantifiedAtom: arbitraryFromQuantifiedAtom,
  termSequence: ({ terms }) => pipe(terms.map(arbitraryFromTerm), chainConcatAll),
})

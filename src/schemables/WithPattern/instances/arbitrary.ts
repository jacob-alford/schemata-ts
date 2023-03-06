/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as Arb from 'schemata-ts/Arbitrary'
import { match, matchOn } from 'schemata-ts/internal/match'
import * as PB from 'schemata-ts/PatternBuilder'
import { WithPattern } from 'schemata-ts/schemables/WithPattern/definition'

const matchK = matchOn('kind')

/** @internal */
export const arbitraryFromAtom: (atom: PB.Atom) => Arb.Arbitrary<string> = matchK({
  anything: () => ({ arbitrary: fc => fc.char() }),
  character: ({ char }) => ({ arbitrary: fc => fc.constant(char) }),
  characterClass: ({ exclude, ranges }) => ({
    arbitrary: fc =>
      (exclude
        ? fc
            .integer({ min: 1, max: 0xffff })
            .filter(i => ranges.every(({ lower, upper }) => i > upper || i < lower))
        : fc.oneof(
            ...ranges.map(({ lower, upper }) => fc.integer({ min: lower, max: upper })),
          )
      ).map(charCode => String.fromCharCode(charCode)),
  }),
  subgroup: ({ subpattern }) => arbitraryFromPattern(subpattern),
})

/** @internal */
export const arbitraryFromQuantifiedAtom: (
  quantifiedAtom: PB.QuantifiedAtom,
) => Arb.Arbitrary<string> = matchK({
  star: ({ atom }) => ({
    arbitrary: fc =>
      fc.array(arbitraryFromAtom(atom).arbitrary(fc)).map(strs => strs.join('')),
  }),
  plus: ({ atom }) => ({
    arbitrary: fc =>
      fc
        .array(arbitraryFromAtom(atom).arbitrary(fc), { minLength: 1 })
        .map(strs => strs.join('')),
  }),
  question: ({ atom }) => ({
    arbitrary: fc =>
      fc
        .array(arbitraryFromAtom(atom).arbitrary(fc), { minLength: 0, maxLength: 1 })
        .map(strs => strs.join('')),
  }),
  exactly: ({ atom, count }) => ({
    arbitrary: fc =>
      fc
        .array(arbitraryFromAtom(atom).arbitrary(fc), {
          minLength: count,
          maxLength: count,
        })
        .map(strs => strs.join('')),
  }),
  between: ({ atom, min, max }) => ({
    arbitrary: fc =>
      fc
        .array(arbitraryFromAtom(atom).arbitrary(fc), { minLength: min, maxLength: max })
        .map(strs => strs.join('')),
  }),
  minimum: ({ atom, min }) => ({
    arbitrary: fc =>
      fc
        .array(arbitraryFromAtom(atom).arbitrary(fc), { minLength: min })
        .map(strs => strs.join('')),
  }),
})

const arbitraryFromTerm: (term: PB.Term) => Arb.Arbitrary<string> = match({
  atom: arbitraryFromAtom,
  quantifiedAtom: arbitraryFromQuantifiedAtom,
})

const chainConcatAll: (
  fcs: ReadonlyArray<Arb.Arbitrary<string>>,
) => Arb.Arbitrary<string> = RA.foldLeft(
  () => ({ arbitrary: fc => fc.constant('') }),
  (head, tail) => ({
    arbitrary: fc =>
      head.arbitrary(fc).chain(headStr =>
        chainConcatAll(tail)
          .arbitrary(fc)
          .map(tailStr => headStr + tailStr),
      ),
  }),
)

/**
 * Construct a `fast-check` `Arbitrary` instance from a given `Pattern`.
 *
 * @since 1.0.0
 */
export const arbitraryFromPattern: (pattern: PB.Pattern) => Arb.Arbitrary<string> = match(
  {
    atom: arbitraryFromAtom,
    disjunction: ({ left, right }) => ({
      arbitrary: fc =>
        fc.oneof(
          arbitraryFromPattern(left).arbitrary(fc),
          arbitraryFromPattern(right).arbitrary(fc),
        ),
    }),
    quantifiedAtom: arbitraryFromQuantifiedAtom,
    termSequence: ({ terms }) => pipe(terms.map(arbitraryFromTerm), chainConcatAll),
  },
)

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithPattern<Arb.SchemableLambda> = {
  pattern: arbitraryFromPattern,
}

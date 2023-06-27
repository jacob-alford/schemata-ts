/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import * as fc from 'fast-check'
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import type * as Arb from 'schemata-ts/internal/arbitrary'
import { match, matchOn } from 'schemata-ts/internal/match'
import type * as PB from 'schemata-ts/PatternBuilder'
import { type WithPattern } from 'schemata-ts/schemables/pattern/definition'

const matchK = matchOn('kind')

/** @internal */
export const arbitraryFromAtom: (atom: PB.Atom) => fc.Arbitrary<string> = matchK({
  anything: () => fc.char(),
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
  quantifiedAtom: PB.QuantifiedAtom,
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
      .array(arbitraryFromAtom(atom), {
        minLength: count,
        maxLength: count,
      })
      .map(strs => strs.join('')),
  between: ({ atom, min, max }) =>
    fc
      .array(arbitraryFromAtom(atom), { minLength: min, maxLength: max })
      .map(strs => strs.join('')),
  minimum: ({ atom, min }) =>
    fc.array(arbitraryFromAtom(atom), { minLength: min }).map(strs => strs.join('')),
})

const arbitraryFromTerm: (term: PB.Term) => fc.Arbitrary<string> = match({
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
export const arbitraryFromPattern: (pattern: PB.Pattern) => fc.Arbitrary<string> = match({
  atom: arbitraryFromAtom,
  disjunction: ({ left, right }) =>
    fc.oneof(arbitraryFromPattern(left), arbitraryFromPattern(right)),
  quantifiedAtom: arbitraryFromQuantifiedAtom,
  termSequence: ({ terms }) => pipe(terms.map(arbitraryFromTerm), chainConcatAll),
})

/**
 * @since 1.0.0
 * @category Instances
 */
export const PatternArbitrary: WithPattern<Arb.SchemableLambda> = {
  pattern: arbitraryFromPattern,
}

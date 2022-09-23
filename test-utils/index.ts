import * as fc from 'fast-check'
import { pipe, tuple } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'

export const combineExpected: <A, B>(
  input: ReadonlyArray<A>,
  expectedOutcome: B
) => ReadonlyArray<readonly [A, B]> = (as, b) => RA.comprehension([as, RA.of(b)], tuple)

export const cat = <A>(...args: ReadonlyArray<ReadonlyArray<A>>): ReadonlyArray<A> =>
  pipe(args, RA.flatten)

export const validateArbitrary: <T, A extends T>(
  t: { Arbitrary: fc.Arbitrary<A> },
  check: (a: T) => a is A
) => void = ({ Arbitrary }, check) => fc.assert(fc.property(Arbitrary, check))

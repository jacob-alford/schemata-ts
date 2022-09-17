import { pipe, tuple } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'

export const combineExpected: <A, B>(
  input: ReadonlyArray<A>,
  expectedOutcome: B
) => ReadonlyArray<readonly [A, B]> = (as, b) => RA.comprehension([as, RA.of(b)], tuple)

export const cat = <A>(...args: ReadonlyArray<ReadonlyArray<A>>): ReadonlyArray<A> =>
  pipe(args, RA.flatten)

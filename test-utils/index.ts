import * as fc from 'fast-check'
import { pipe, tuple, unsafeCoerce } from 'fp-ts/function'
import * as N from 'fp-ts/number'
import * as Mn from 'fp-ts/Monoid'
import * as RA from 'fp-ts/ReadonlyArray'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any

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

type ZipN = {
  <A, B>(as: ReadonlyArray<A>, bs: ReadonlyArray<B>): ReadonlyArray<[A, B]>
  <A, B, C>(
    as: ReadonlyArray<A>,
    bs: ReadonlyArray<B>,
    cs: ReadonlyArray<C>
  ): ReadonlyArray<[A, B, C]>
  <A, B, C, D>(
    as: ReadonlyArray<A>,
    bs: ReadonlyArray<B>,
    cs: ReadonlyArray<C>,
    ds: ReadonlyArray<D>
  ): ReadonlyArray<[A, B, C, D]>
}

export const zipN: ZipN = (...args: ReadonlyArray<ReadonlyArray<Any>>) => {
  const smallestLength = pipe(
    args,
    RA.foldMap(Mn.min(N.Bounded))(a => a.length)
  )
  const _: <A>(xs: ReadonlyArray<A>, i: number) => A = (xs, i) => unsafeCoerce(xs[i])
  const zipped = []
  for (let i = 0; i < smallestLength; ++i) {
    const tupleN = []
    for (const arrN of args) {
      tupleN.push(_(arrN, i))
    }
    zipped.push(tupleN)
  }
  return RA.fromArray(zipped) as Any
}

import { constant, identity, unsafeCoerce } from 'fp-ts/function'
import { type Semigroup } from 'fp-ts/Semigroup'
import type * as hkt from 'schemata-ts/internal/schemable'
import { memoize } from 'schemata-ts/Schema'

/** @internal */
export interface MergeSemigroup<O> {
  readonly semigroup: (concrete: Semigroup<unknown>) => Semigroup<O>
}

/** @internal */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: MergeSemigroup<this['Output']>
}

/** @internal */
export const constSemigroup: <O>(
  make: (concrete: Semigroup<unknown>) => Semigroup<O>,
) => MergeSemigroup<O> = make => ({
  semigroup: memoize(make),
})

/** @internal */
export const makeMergeSemigroup: <O>(
  make: (concrete: Semigroup<unknown>) => (x: O, y: O) => O,
) => MergeSemigroup<O> = make => ({
  semigroup: memoize(concrete => ({
    concat: make(concrete),
  })),
})

/** @internal */
export const concrete: <A>() => MergeSemigroup<A> = unsafeCoerce(
  constant(constSemigroup(identity)),
)

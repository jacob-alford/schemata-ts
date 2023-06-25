import { type Semigroup, first, last } from 'fp-ts/Semigroup'
import type * as hkt from 'schemata-ts/internal/schemable'
import { memoize } from 'schemata-ts/Schema'

type MergeOptions = {
  readonly string?: Semigroup<string>
  readonly number?: Semigroup<number>
  readonly boolean?: Semigroup<boolean>
  readonly unknown?: Semigroup<unknown>
  readonly fallback: 'first' | 'last'
}

/** @internal */
export interface MergeSemigroup<O> {
  readonly semigroup: (concrete?: 'first' | 'last' | MergeOptions) => Semigroup<O>
}

/** @internal */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: MergeSemigroup<this['Output']>
}

/** @internal */
export const identity: <O>(choose?: keyof MergeOptions) => MergeSemigroup<O> = (
  choice = 'fallback',
) =>
  constSemigroup((concrete = 'last') =>
    concrete === 'last'
      ? last()
      : concrete === 'first'
      ? first()
      : concrete[choice] ?? concrete['fallback'] === 'first'
      ? first()
      : last(),
  )

/** @internal */
export const constSemigroup: <O>(
  make: (concrete?: 'first' | 'last' | MergeOptions) => Semigroup<O>,
) => MergeSemigroup<O> = make => ({
  semigroup: memoize(make),
})

/** @internal */
export const makeMergeSemigroup: <O>(
  make: (concrete?: 'first' | 'last' | MergeOptions) => (x: O, y: O) => O,
) => MergeSemigroup<O> = make => ({
  semigroup: memoize(concrete => ({
    concat: make(concrete),
  })),
})

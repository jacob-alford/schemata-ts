import { type Semigroup, first, last } from 'fp-ts/Semigroup'
import { memoize } from 'schemata-ts/internal/schema'
import type * as hkt from 'schemata-ts/internal/schemable'

export type MergeStrategy = {
  readonly string?: Semigroup<string>
  readonly number?: Semigroup<number>
  readonly boolean?: Semigroup<boolean>
  readonly unknown?: Semigroup<unknown>
  readonly fallback: 'first' | 'last'
}

export interface MergeSemigroup<O> {
  readonly semigroup: (concrete?: 'first' | 'last' | MergeStrategy) => Semigroup<O>
}

export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: MergeSemigroup<this['Output']>
}

// istanbul ignore next
/** @internal */
export const identity = <O>(choice: keyof MergeStrategy): MergeSemigroup<O> =>
  constSemigroup<any>((concrete = 'last') => {
    if (concrete === 'last') {
      return last()
    }
    if (concrete === 'first') {
      return first()
    }

    const _ = concrete[choice]

    if (typeof _ !== 'string' && _ !== undefined) {
      return _
    }

    if (_ === 'first') {
      return first()
    }

    if (_ === 'last') {
      return last()
    }

    return concrete['fallback'] === 'last' ? last() : first()
  })

/** @internal */
export const constSemigroup: <O>(
  make: (concrete?: 'first' | 'last' | MergeStrategy) => Semigroup<O>,
) => MergeSemigroup<O> = make => ({
  semigroup: memoize(make),
})

/** @internal */
export const makeMergeSemigroup: <O>(
  make: (concrete?: 'first' | 'last' | MergeStrategy) => (x: O, y: O) => O,
) => MergeSemigroup<O> = make => ({
  semigroup: memoize(concrete => ({
    concat: make(concrete),
  })),
})

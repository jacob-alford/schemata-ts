import { type Lazy } from 'fp-ts/function'
import * as MSg from 'schemata-ts/internal/merge-semigroup'
import { memoize } from 'schemata-ts/Schema'
import { type WithLazy } from 'schemata-ts/schemables/lazy/definition'

export const LazyMergeSemigroup: WithLazy<MSg.SchemableLambda> = {
  lazy: <O>(_: string, f: Lazy<MSg.MergeSemigroup<O>>): MSg.MergeSemigroup<O> => {
    const get = memoize<void, MSg.MergeSemigroup<O>>(f)
    return MSg.constSemigroup(concrete => get().semigroup(concrete))
  },
}

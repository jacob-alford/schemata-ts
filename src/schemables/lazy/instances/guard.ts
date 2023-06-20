import { type Lazy } from 'fp-ts/function'
import type * as G from 'schemata-ts/internal/guard'
import { memoize } from 'schemata-ts/Schema'
import { type WithLazy } from 'schemata-ts/schemables/lazy/definition'

export const LazyGuard: WithLazy<G.SchemableLambda> = {
  lazy: <O>(_: string, f: Lazy<G.Guard<O>>): G.Guard<O> => {
    const get = memoize<void, G.Guard<O>>(f)
    return {
      is: (u): u is O => get().is(u),
    }
  },
}

import { Lazy } from 'fp-ts/function'
import * as Eq from 'schemata-ts/internal/eq'
import { memoize } from 'schemata-ts/Schema'
import { WithLazy } from 'schemata-ts/schemables/lazy/definition'

export const LazyEq: WithLazy<Eq.SchemableLambda> = {
  lazy: <O>(_: string, f: Lazy<Eq.Eq<O>>): Eq.Eq<O> => {
    const get = memoize<void, Eq.Eq<O>>(f)
    return {
      equals: (x, y) => get().equals(x, y),
    }
  },
}

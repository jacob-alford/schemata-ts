import { Lazy } from 'fp-ts/function'
import * as Inf from 'schemata-ts/internal/information'
import { memoize } from 'schemata-ts/Schema'
import { WithLazy } from 'schemata-ts/schemables/lazy/definition'

export const LazyInformation: WithLazy<Inf.SchemableLambda> = {
  lazy: <O>(f: Lazy<Inf.Information<O>>): Inf.Information<O> => {
    const get = memoize<void, Inf.Information<O>>(f)
    return get()
  },
}

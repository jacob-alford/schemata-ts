import { Const } from 'fp-ts/Const'
import { Lazy } from 'fp-ts/function'
import * as JS from 'schemata-ts/internal/json-schema'
import { memoize } from 'schemata-ts/Schema'
import { WithLazy } from 'schemata-ts/schemables/lazy/definition'

export const LazyJsonSchema: WithLazy<JS.SchemableLambda> = {
  lazy: <O>(f: Lazy<Const<JS.JsonSchema, O>>): Const<JS.JsonSchema, O> => {
    const get = memoize<void, Const<JS.JsonSchema, O>>(f)
    return get()
  },
}

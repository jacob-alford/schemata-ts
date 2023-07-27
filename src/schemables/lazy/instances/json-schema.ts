import { type Const } from 'fp-ts/Const'
import * as JS from 'schemata-ts/internal/json-schema'
import { type WithLazy } from 'schemata-ts/schemables/lazy/definition'

export const LazyJsonSchema: WithLazy<JS.SchemableLambda> = {
  lazy: <O>(name: string): Const<JS.JsonSchema, O> => JS.make(new JS.JsonRef(name)),
}

import { type SchemableLambda, makeTypeString } from 'schemata-ts/internal/type-string'
import { type WithLazy } from 'schemata-ts/schemables/lazy/definition'

export const LazyTypeString: WithLazy<SchemableLambda> = {
  lazy: _ => makeTypeString(`Lazy<${_}>`),
}

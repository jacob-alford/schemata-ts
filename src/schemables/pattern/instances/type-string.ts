import { type SchemableLambda, makeTypeString } from 'schemata-ts/internal/type-string'
import { type WithPattern } from 'schemata-ts/schemables/pattern/definition'

export const PatternTypeString: WithPattern<SchemableLambda> = {
  pattern: (_, name) => makeTypeString(`${name}*`),
}

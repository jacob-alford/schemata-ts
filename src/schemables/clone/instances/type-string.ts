import { type SchemableLambda, makeTypeString } from 'schemata-ts/internal/type-string'
import { type WithClone } from 'schemata-ts/schemables/clone/definition'

export const CloneTypeString: WithClone<SchemableLambda> = {
  clone: _ => makeTypeString(_.slice() as [string, string]),
}

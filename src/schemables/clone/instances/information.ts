import { identity } from 'fp-ts/function'
import * as Inf from 'schemata-ts/internal/information'
import { WithClone } from 'schemata-ts/schemables/clone/definition'

export const CloneInformation: WithClone<Inf.SchemableLambda> = {
  clone: identity,
}

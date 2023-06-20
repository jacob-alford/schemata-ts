import { identity } from 'fp-ts/function'
import type * as Inf from 'schemata-ts/internal/information'
import { type WithClone } from 'schemata-ts/schemables/clone/definition'

export const CloneInformation: WithClone<Inf.SchemableLambda> = {
  clone: identity,
}

import type * as MSg from 'schemata-ts/internal/merge-semigroup'
import { type WithClone } from 'schemata-ts/schemables/clone/definition'

export const CloneMergeSemigroup: WithClone<MSg.SchemableLambda> = {
  clone: msg => Object.assign({}, msg),
}

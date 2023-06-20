import type * as G from 'schemata-ts/internal/guard'
import { type WithInvariant } from 'schemata-ts/schemables/invariant/definition'

export const InvariantGuard: WithInvariant<G.SchemableLambda> = {
  imap: gB => () => () => gB,
}

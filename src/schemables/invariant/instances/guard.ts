import * as G from 'schemata-ts/internal/guard'
import { WithInvariant } from 'schemata-ts/schemables/invariant/definition'

export const InvariantGuard: WithInvariant<G.SchemableLambda> = {
  imap: gB => () => () => gB,
}

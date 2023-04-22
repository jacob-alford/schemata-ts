import * as G from 'schemata-ts/internal/guard'
import { WithInvariant } from 'schemata-ts/schemables/invariant/definition'

export const WithInvariantGuard: WithInvariant<G.SchemableLambda> = {
  imap: gB => () => () => gB,
}

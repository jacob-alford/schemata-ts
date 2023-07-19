import * as Eq from 'schemata-ts/internal/eq'
import { type WithInvariant } from 'schemata-ts/schemables/invariant/definition'

export const InvariantEq: WithInvariant<Eq.SchemableLambda> = {
  imap: () => Eq.imap,
}

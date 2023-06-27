import type * as Arb from 'schemata-ts/internal/arbitrary'
import { type WithInvariant } from 'schemata-ts/schemables/invariant/definition'

export const InvariantArbitrary: WithInvariant<Arb.SchemableLambda> = {
  imap: () => get => arb => arb.map(get),
}

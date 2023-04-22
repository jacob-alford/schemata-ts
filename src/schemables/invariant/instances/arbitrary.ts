import * as Arb from 'schemata-ts/internal/arbitrary'
import { WithInvariant } from 'schemata-ts/schemables/invariant/definition'

export const InvariantArbitrary: WithInvariant<Arb.SchemableLambda> = {
  imap: () => get => arb => ({ arbitrary: fc => arb.arbitrary(fc).map(get) }),
}

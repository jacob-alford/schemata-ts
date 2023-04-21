import * as Arb from 'schemata-ts/internal/arbitrary'
import { WithInvariant } from 'schemata-ts/schemables/WithInvariant/definition'

export const WithInvariantArbitrary: WithInvariant<Arb.SchemableLambda> = {
  imap: () => get => arb => ({ arbitrary: fc => arb.arbitrary(fc).map(get) }),
}

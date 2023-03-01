/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import * as Arb from 'schemata-ts/Arbitrary'
import { WithInvariant1 } from 'schemata-ts/schemables/WithInvariant/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithInvariant1<Arb.URI> = {
  imap: () => get => arb => ({ arbitrary: fc => arb.arbitrary(fc).map(get) }),
}

/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import * as Arb from '../../../base/ArbitraryBase'
import { WithInvariant1 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithInvariant1<Arb.URI> = {
  imap: () => get => arb => arb.map(get),
}

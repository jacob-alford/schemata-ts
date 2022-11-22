/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import * as G from '../../../base/GuardBase'
import { WithInvariant1 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithInvariant1<G.URI> = {
  imap: gB => () => () => gB,
}

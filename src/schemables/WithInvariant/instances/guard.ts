/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import * as G from 'schemata-ts/Guard'
import { WithInvariant } from 'schemata-ts/schemables/WithInvariant/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithInvariant<G.SchemableLambda> = {
  imap: gB => () => () => gB,
}

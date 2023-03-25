/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import * as PD from 'schemata-ts/internal/ParallelDecoder'
import { WithInvariant } from 'schemata-ts/schemables/WithInvariant/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const ParallelDecoder: WithInvariant<PD.SchemableLambda> = {
  imap: () => PD.map,
}

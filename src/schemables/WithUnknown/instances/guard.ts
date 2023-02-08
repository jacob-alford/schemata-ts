/**
 * Guard instance for WithUnknown
 *
 * @since 1.3.0
 */
import * as G from 'io-ts/Guard'
import { WithUnknown1 } from 'schemata-ts/schemables/WithUnknown/definition'

/**
 * @since 1.3.0
 * @category Instances
 */
export const Guard: WithUnknown1<G.URI> = {
  unknown: G.id(),
}

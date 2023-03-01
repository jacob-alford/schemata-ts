/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import * as G from 'schemata-ts/Guard'
import { WithPattern1 } from 'schemata-ts/schemables/WithPattern/definition'
import { pattern } from 'schemata-ts/schemables/WithPattern/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithPattern1<G.URI> = {
  pattern,
}

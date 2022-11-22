/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import * as G from '../../../base/GuardBase'
import { WithPattern1 } from '../definition'
import { pattern } from '../utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithPattern1<G.URI> = {
  pattern,
}

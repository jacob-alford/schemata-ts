/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import * as Eq_ from '../../../base/EqBase'
import { WithPattern1 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithPattern1<Eq_.URI> = {
  pattern: () => Eq_.string,
}

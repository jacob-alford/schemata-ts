/**
 * Floating point branded newtype. Parameters: min, max are inclusive.
 *
 * Represents floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 */
import * as Eq_ from 'fp-ts/Eq'
import * as N from 'fp-ts/number'
import { WithFloat1 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithFloat1<Eq_.URI> = { float: () => N.Eq }

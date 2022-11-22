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
import * as Enc from 'io-ts/Encoder'
import { WithFloat2 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithFloat2<Enc.URI> = { float: () => Enc.id() }

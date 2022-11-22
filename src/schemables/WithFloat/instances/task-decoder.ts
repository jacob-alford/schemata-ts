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
import * as TD from 'io-ts/TaskDecoder'
import { WithFloat2C } from '../definition'
import { isFloat } from '../utils'
import { pipe } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithFloat2C<TD.URI, unknown> = {
  float: params => pipe(TD.number, TD.refine(isFloat(params), 'float')),
}

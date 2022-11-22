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
import * as t from 'io-ts/Type'
import { WithFloat1 } from '../definition'
import { isFloat } from '../utils'
import { pipe } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithFloat1<t.URI> = {
  float: params => pipe(t.number, t.refine(isFloat(params), 'float')),
}

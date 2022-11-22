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
import { pipe } from 'fp-ts/function'
import * as D from 'io-ts/Decoder'

import { WithFloat2C } from '../definition'
import { isFloat } from '../utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithFloat2C<D.URI, unknown> = {
  float: params => pipe(D.number, D.refine(isFloat(params), 'float')),
}

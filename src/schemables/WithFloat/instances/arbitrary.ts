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
import * as fc from 'fast-check'

import * as Arb from '../../../base/ArbitraryBase'
import { WithFloat1 } from '../definition'
import { isFloat } from '../utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithFloat1<Arb.URI> = {
  float(params = {}) {
    const { min = -Number.MAX_VALUE, max = Number.MAX_VALUE } = params
    return fc
      .double({
        min,
        max,
        noDefaultInfinity: true,
        noNaN: true,
      })
      .filter(isFloat(params))
  },
}

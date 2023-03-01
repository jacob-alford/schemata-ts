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
import * as Arb from 'schemata-ts/Arbitrary'
import { WithFloat1 } from 'schemata-ts/schemables/WithFloat/definition'
import { isFloat } from 'schemata-ts/schemables/WithFloat/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithFloat1<Arb.URI> = {
  float(params = {}) {
    const { min = -Number.MAX_VALUE, max = Number.MAX_VALUE } = params
    return {
      arbitrary: fc =>
        fc
          .double({
            min,
            max,
            noDefaultInfinity: true,
            noNaN: true,
          })
          .filter(isFloat(params)),
    }
  },
}

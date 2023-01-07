/**
 * Integer branded newtype. Parameters: min, max are inclusive.
 *
 * Represents integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 */
import * as Arb from 'schemata-ts/base/ArbitraryBase'
import { WithInt1 } from 'schemata-ts/schemables/WithInt/definition'
import { isInt } from 'schemata-ts/schemables/WithInt/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithInt1<Arb.URI> = {
  int: (params = {}) => {
    const { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = params
    return {
      arbitrary: fc =>
        fc
          .integer({
            min: Math.floor(Math.max(min, Number.MIN_SAFE_INTEGER)),
            max: Math.floor(Math.min(max, Number.MAX_SAFE_INTEGER)),
          })
          .filter(isInt(params)),
    }
  },
}

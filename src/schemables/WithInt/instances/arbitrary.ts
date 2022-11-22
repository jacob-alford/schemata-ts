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
import * as fc from 'fast-check'

import * as Arb from '../../../base/ArbitraryBase'
import { WithInt1 } from '../definition'
import { isInt } from '../utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithInt1<Arb.URI> = {
  int: (params = {}) => {
    const { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = params
    return fc
      .integer({
        min: Math.floor(Math.max(min, Number.MIN_SAFE_INTEGER)),
        max: Math.floor(Math.min(max, Number.MAX_SAFE_INTEGER)),
      })
      .filter(isInt(params))
  },
}

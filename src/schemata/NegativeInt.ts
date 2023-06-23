/** @since 1.0.0 */
import { type Integer, type MinSafeInt, minSafeInt } from 'schemata-ts/integer'
import { type Schema } from 'schemata-ts/Schema'
import { Int } from 'schemata-ts/schemata/Int'

/**
 * Negative integer branded newtype.
 *
 * Represents negative integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z < 0 }
 * ```
 *
 * @since 1.0.0
 * @category Number
 */
export const NegativeInt: Schema<Integer<MinSafeInt, -1>> = Int({
  min: minSafeInt,
  max: -1,
})

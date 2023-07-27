/** @since 1.0.0 */
import { type Integer, type MinSafeInt, minSafeInt } from 'schemata-ts/integer'
import { type Schema } from 'schemata-ts/Schema'
import { Int } from 'schemata-ts/schemata/Int'

/**
 * NonPositive integer branded newtype.
 *
 * Represents integers which are negative or zero.
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 0 }
 * ```
 *
 * @since 1.0.0
 * @category Number
 */
export const NonPositiveInt: Schema<Integer<MinSafeInt, 0>> = Int({
  min: minSafeInt,
  max: 0,
})

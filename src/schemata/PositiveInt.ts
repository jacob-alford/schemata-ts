/**
 * Positive integer branded newtype.
 *
 * Represents positive integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z > 0, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 */
import { Integer, MaxSafeInt, maxSafeInt } from 'schemata-ts/integer'
import { Schema } from 'schemata-ts/Schema'
import { Int } from 'schemata-ts/schemata/Int'

/**
 * Positive integer branded newtype.
 *
 * Represents positive integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z > 0, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 * @category Schema
 */
export const PositiveInt: Schema<Integer<1, MaxSafeInt>, Integer<1, MaxSafeInt>> = Int({
  min: 1,
  max: maxSafeInt,
})

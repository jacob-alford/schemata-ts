/**
 * Natural branded newtype.
 *
 * Represents integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= 0, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 */
import { Integer, MaxSafeInt } from 'schemata-ts/integer'
import { Schema } from 'schemata-ts/Schema'
import { Int } from 'schemata-ts/schemata/Int'

/**
 * Natural branded newtype.
 *
 * Represents integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= 0, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 * @category Schema
 */
export const Natural: Schema<Integer<0, MaxSafeInt>, Integer<0, MaxSafeInt>> = Int({
  min: 0,
})

/**
 * Non-negative floating point branded newtype.
 *
 * Represents non-negative floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f >= 0, f <= Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 */
import { Float, MaxPositiveFloat, maxPositiveFloat } from 'schemata-ts/float'
import { Schema } from 'schemata-ts/Schema'
import { Float as Floating } from 'schemata-ts/schemata/Float'

/**
 * Non-negative floating point branded newtype.
 *
 * Represents non-negative floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f >= 0, f <= Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 * @category Schema
 */
export const NonNegativeFloat: Schema<Float<0, MaxPositiveFloat>> = Floating({
  min: 0,
  max: maxPositiveFloat,
})

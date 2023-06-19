/**
 * Non-positive floating point branded newtype.
 *
 * Represents non-positive floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f <= 0, f >= -Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 */
import {
  Float,
  MaxNegativeFloat,
  maxNegativeFloat,
  MinNegativeFloat,
  minNegativeFloat,
} from 'schemata-ts/float'
import { Schema } from 'schemata-ts/Schema'
import { Float as Floating } from 'schemata-ts/schemata/Float'

/**
 * Non-positive floating point branded newtype.
 *
 * Represents non-positive floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f <= 0, f >= -Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 * @category Schema
 */
export const NonPositiveFloat: Schema<Float<MaxNegativeFloat, MinNegativeFloat>> =
  Floating({
    min: maxNegativeFloat,
    max: minNegativeFloat,
  })

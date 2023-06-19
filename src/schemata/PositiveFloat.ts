/**
 * Positive Float branded newtype.
 *
 * Represents floating point numbers:
 *
 * ```math
 *  { f | f ∈ R, f > 0, f <= Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 */
import {
  Float,
  MaxPositiveFloat,
  maxPositiveFloat,
  MinPositiveFloat,
  minPositiveFloat,
} from 'schemata-ts/float'
import { Schema } from 'schemata-ts/Schema'
import { Float as Floating } from 'schemata-ts/schemata/Float'

/**
 * Positive Float branded newtype.
 *
 * Represents floating point numbers:
 *
 * ```math
 *  { f | f ∈ R, f > 0, f <= Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 * @category Schema
 */
export const PositiveFloat: Schema<Float<MinPositiveFloat, MaxPositiveFloat>> = Floating({
  min: minPositiveFloat,
  max: maxPositiveFloat,
})

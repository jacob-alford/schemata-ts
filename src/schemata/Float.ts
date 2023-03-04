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
import { make, Schema } from 'schemata-ts/Schema'
import {
  BoundedParams,
  Float as Floating,
  MaxNegativeFloat,
  MaxPositiveFloat,
} from 'schemata-ts/schemables/WithPrimitives/definition'

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
export const Float = <
  Min extends number | undefined = undefined,
  Max extends number | undefined = undefined,
>(
  params?: BoundedParams<Min, Max>,
): Schema<
  number,
  Floating<
    Min extends undefined ? MaxNegativeFloat : Min,
    Max extends undefined ? MaxPositiveFloat : Max
  >
> =>
  make<
    number,
    Floating<
      Min extends undefined ? MaxNegativeFloat : Min,
      Max extends undefined ? MaxPositiveFloat : Max
    >
  >(s => s.float(params))
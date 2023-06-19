/** @since 1.0.0 */
import { Float as Floating, MaxNegativeFloat, MaxPositiveFloat } from 'schemata-ts/float'
import { make, Schema } from 'schemata-ts/Schema'
import { BoundedParams } from 'schemata-ts/schemables/primitives/definition'

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
  Floating<
    Min extends undefined ? MaxNegativeFloat : Min,
    Max extends undefined ? MaxPositiveFloat : Max
  >
> => make(s => s.float(params))

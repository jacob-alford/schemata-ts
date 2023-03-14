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
import { Integer, MaxSafeInt, MinSafeInt } from 'schemata-ts/integer'
import { make, Schema } from 'schemata-ts/Schema'
import { BoundedParams } from 'schemata-ts/schemables/WithPrimitives/definition'

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
export const Int = <
  Min extends number | undefined = undefined,
  Max extends number | undefined = undefined,
>(
  params?: BoundedParams<Min, Max>,
): Schema<
  number,
  Integer<
    Min extends undefined ? MinSafeInt : Min,
    Max extends undefined ? MaxSafeInt : Max
  >
> => make(s => s.int(params))

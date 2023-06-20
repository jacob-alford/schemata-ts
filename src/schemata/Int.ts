/** @since 1.0.0 */
import { type Integer, type MaxSafeInt, type MinSafeInt } from 'schemata-ts/integer'
import { type Schema, make } from 'schemata-ts/Schema'
import { type BoundedParams } from 'schemata-ts/schemables/primitives/definition'

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
  Integer<
    Min extends undefined ? MinSafeInt : Min,
    Max extends undefined ? MaxSafeInt : Max
  >
> => make(s => s.int(params))

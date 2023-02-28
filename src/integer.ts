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
 * @category Model
 */
import { Branded } from 'schemata-ts/brand'

/**
 * The smallest safe integer in JavaScript.
 *
 * @since 2.0.0
 * @category Model
 */
export type MinSafeInt = -9007199254740991

/**
 * The largest safe integer in JavaScript.
 *
 * @since 2.0.0
 * @category Model
 */
export type MaxSafeInt = 9007199254740991

interface IntBrand<Min extends number, Max extends number> {
  readonly Int: unique symbol
  readonly Min: Min
  readonly Max: Max
}

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
 * @category Model
 */
export type Integer<Min extends number, Max extends number> = Branded<
  number,
  IntBrand<Min, Max>
>

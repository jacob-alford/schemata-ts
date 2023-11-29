/**
 * `Integer` represents valid/safe javascript integer numbers within (and tagged with) a
 * certain range.
 *
 * @since 2.0.0
 */
import { type Branded } from 'schemata-ts/brand'

/**
 * The smallest safe integer in JavaScript.
 *
 * @since 2.0.0
 * @category Model
 */
export type MinSafeInt = -9007199254740991

/**
 * The smallest safe integer in JavaScript.
 *
 * @since 2.0.0
 */
export const minSafeInt: MinSafeInt = Number.MIN_SAFE_INTEGER as MinSafeInt

/**
 * The largest safe integer in JavaScript.
 *
 * @since 2.0.0
 * @category Model
 */
export type MaxSafeInt = 9007199254740991

/**
 * The largest safe integer in JavaScript.
 *
 * @since 2.0.0
 */
export const maxSafeInt: MaxSafeInt = Number.MAX_SAFE_INTEGER as MaxSafeInt

/**
 * A brand for bounded integers.
 *
 * @since 2.2.1
 */
export interface IntBrand<Min extends number, Max extends number> {
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
export type Integer<
  Min extends number = MinSafeInt,
  Max extends number = MaxSafeInt,
> = Branded<number, IntBrand<Min, Max>>

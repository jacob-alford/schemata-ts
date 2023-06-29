/** @since 2.0.0 */
import { type Branded } from 'schemata-ts/brand'

/**
 * The smallest positive float in JavaScript.
 *
 * @since 2.0.0
 * @category Model
 */
export type MinPositiveFloat = 5e-324

/**
 * The smallest positive float in JavaScript.
 *
 * @since 2.0.0
 */
export const minPositiveFloat: MinPositiveFloat = Number.MIN_VALUE as MinPositiveFloat

/**
 * The smallest negative float in JavaScript.
 *
 * @since 2.0.0
 * @category Model
 */
export type MinNegativeFloat = -5e-324

/**
 * The smallest negative float in JavaScript.
 *
 * @since 2.0.0
 */
export const minNegativeFloat: MinNegativeFloat = -Number.MIN_VALUE as MinNegativeFloat

/**
 * The largest positive float in JavaScript.
 *
 * @since 2.0.0
 * @category Model
 */
export type MaxPositiveFloat = 1.7976931348623157e308

/**
 * The largest positive float in JavaScript.
 *
 * @since 2.0.0
 */
export const maxPositiveFloat: MaxPositiveFloat = Number.MAX_VALUE as MaxPositiveFloat

/**
 * The largest negative float in JavaScript.
 *
 * @since 2.0.0
 * @category Model
 */
export type MaxNegativeFloat = -1.7976931348623157e308

/**
 * The largest negative float in JavaScript.
 *
 * @since 2.0.0
 */
export const maxNegativeFloat: MaxNegativeFloat = -Number.MAX_VALUE as MaxNegativeFloat

/** @since 2.0.0 */
interface FloatBrand<Min extends number, Max extends number> {
  readonly Float: unique symbol
  readonly Min: Min
  readonly Max: Max
}

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
 * @category Model
 */
export type Float<
  Min extends number = MaxNegativeFloat,
  Max extends number = MaxPositiveFloat,
> = Branded<number, FloatBrand<Min, Max>>

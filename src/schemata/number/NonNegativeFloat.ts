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
import { pipe } from 'fp-ts/function'
import { make, SchemaExt } from '../../SchemaExt'
import { Brand } from 'io-ts'

/** @internal */
type NonNegativeFloatBrand = Brand<
  { readonly NonNegativeFloat: unique symbol }['NonNegativeFloat']
>

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
 * @category Model
 */
export type NonNegativeFloat = number & NonNegativeFloatBrand

/**
 * @since 1.0.0
 * @category Model
 */
export type NonNegativeFloatS = SchemaExt<number, NonNegativeFloat>

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
export const NonNegativeFloat: NonNegativeFloatS = make(S =>
  pipe(S.float({ min: 0 }), S.brand<NonNegativeFloatBrand>()),
)

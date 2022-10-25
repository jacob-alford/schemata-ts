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
import { make, TypeOf } from '../../SchemaExt'
import { Brand } from 'io-ts'

/** @internal */
type NonNegativeFloatBrand = Brand<
  { readonly NonNegativeFloat: unique symbol }['NonNegativeFloat']
>

/**
 * @since 1.0.0
 * @category Schema
 */
export const NonNegativeFloat = make(S =>
  pipe(S.float({ min: 0 }), S.brand<NonNegativeFloatBrand>())
)

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
export type NonNegativeFloat = TypeOf<typeof NonNegativeFloat>

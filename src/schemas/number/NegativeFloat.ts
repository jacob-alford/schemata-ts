/**
 * Negative floating point branded newtype.
 *
 * Represents negative floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f < 0, f >= -Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { make, TypeOf } from '../../SchemaExt'
import { Brand } from 'io-ts'

/** @internal */
type NegativeFloatBrand = Brand<
  { readonly NegativeFloat: unique symbol }['NegativeFloat']
>

/**
 * @since 1.0.0
 * @category Schema
 */
export const NegativeFloat = make(S =>
  pipe(S.float({ max: -Number.MIN_VALUE }), S.brand<NegativeFloatBrand>())
)

/**
 * Negative floating point branded newtype.
 *
 * Represents negative floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f < 0, f >= -Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 */
export type NegativeFloat = TypeOf<typeof NegativeFloat>

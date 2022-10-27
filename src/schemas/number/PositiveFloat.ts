/**
 * Positive Float branded newtype.
 *
 * Represents floating point numbers:
 *
 * ```math
 *  { f | f ∈ R, f > 0, f <= Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { make, SchemaExt } from '../../SchemaExt'
import { Brand } from 'io-ts'

/** @internal */
type PositiveFloatBrand = Brand<
  { readonly PositiveFloat: unique symbol }['PositiveFloat']
>

/**
 * @since 1.0.0
 * @category Model
 */
export type PositiveFloat = number & PositiveFloatBrand

/**
 * Positive Float branded newtype.
 *
 * Represents floating point numbers:
 *
 * ```math
 *  { f | f ∈ R, f > 0, f <= Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 * @category Schema
 */
export const PositiveFloat: SchemaExt<number, PositiveFloat> = make(S =>
  pipe(S.float({ min: Number.MIN_VALUE }), S.brand<PositiveFloatBrand>())
)

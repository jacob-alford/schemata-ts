/**
 * Non-positive floating point branded newtype.
 *
 * Represents non-positive floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f <= 0, f >= -Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { make, TypeOf } from '../../SchemaExt'
import { Brand } from 'io-ts'

/** @internal */
type NonPositiveFloatBrand = Brand<
  { readonly NonPositiveFloat: unique symbol }['NonPositiveFloat']
>

/**
 * @since 1.0.0
 * @category Schema
 */
export const NonPositiveFloat = make(S =>
  pipe(S.float({ max: 0 }), S.brand<NonPositiveFloatBrand>())
)

/**
 * Non-positive floating point branded newtype.
 *
 * Represents non-positive floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f <= 0, f >= -Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 */
export type NonPositiveFloat = TypeOf<typeof NonPositiveFloat>

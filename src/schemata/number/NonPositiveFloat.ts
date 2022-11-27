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
import { Branded } from 'io-ts'

import { make, SchemaExt } from '../../SchemaExt'

/** @internal */
interface NonPositiveFloatBrand {
  readonly NonPositiveFloat: unique symbol
}

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
 * @category Model
 */
export type NonPositiveFloat = Branded<number, NonPositiveFloatBrand>

/**
 * @since 1.0.0
 * @category Model
 */
export type NonPositiveFloatS = SchemaExt<number, NonPositiveFloat>

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
 * @category Schema
 */
export const NonPositiveFloat: NonPositiveFloatS = make(S =>
  pipe(S.float({ max: 0 }), S.brand<NonPositiveFloatBrand>()),
)

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
import { Branded } from 'schemata-ts/brand'
import { make, SchemaExt } from 'schemata-ts/SchemaExt'

interface PositiveFloatBrand {
  readonly PositiveFloat: unique symbol
}

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
 * @category Model
 */
export type PositiveFloat = Branded<number, PositiveFloatBrand>

/**
 * @since 1.0.0
 * @category Model
 */
export type PositiveFloatS = SchemaExt<number, PositiveFloat>

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
export const PositiveFloat: PositiveFloatS = make(S =>
  pipe(S.float({ min: Number.MIN_VALUE }), S.brand<PositiveFloatBrand>()),
)

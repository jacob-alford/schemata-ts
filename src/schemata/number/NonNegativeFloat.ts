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
import { Branded } from 'schemata-ts/brand'
import { make, SchemaExt } from 'schemata-ts/SchemaExt'

interface NonNegativeFloatBrand {
  readonly NonNegativeFloat: unique symbol
}

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
export type NonNegativeFloat = Branded<number, NonNegativeFloatBrand>

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

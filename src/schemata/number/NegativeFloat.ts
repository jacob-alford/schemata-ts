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
import { make, SchemaExt } from '../../SchemaExt'
import { Branded } from 'io-ts'

/** @internal */
interface NegativeFloatBrand { readonly NegativeFloat: unique symbol }

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
 * @category Model
 */
export type NegativeFloat = Branded<number, NegativeFloatBrand>

/**
 * @since 1.0.0
 * @category Model
 */
export type NegativeFloatS = SchemaExt<number, NegativeFloat>

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
 * @category Schema
 */
export const NegativeFloat: NegativeFloatS = make(S =>
  pipe(S.float({ max: -Number.MIN_VALUE }), S.brand<NegativeFloatBrand>()),
)

/**
 * Negative integer branded newtype.
 *
 * Represents negative integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z < 0 }
 * ```
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { make, SchemaExt } from '../../SchemaExt'
import { Brand } from 'io-ts'

/** @internal */
type NegativeIntBrand = Brand<{ readonly NegativeInt: unique symbol }['NegativeInt']>

/**
 * Negative integer branded newtype.
 *
 * Represents negative integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z < 0 }
 * ```
 *
 * @since 1.0.0
 * @category Model
 */
export type NegativeInt = number & NegativeIntBrand

/**
 * @since 1.0.0
 * @category Model
 */
export type NegativeIntS = SchemaExt<number, NegativeInt>

/**
 * Negative integer branded newtype.
 *
 * Represents negative integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z < 0 }
 * ```
 *
 * @since 1.0.0
 * @category Schema
 */
export const NegativeInt: NegativeIntS = make(S =>
  pipe(S.int({ max: -1 }), S.brand<NegativeIntBrand>()),
)

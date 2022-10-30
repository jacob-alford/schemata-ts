/**
 * Positive integer branded newtype.
 *
 * Represents positive integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z > 0, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { make, SchemaExt } from '../../SchemaExt'
import { Brand } from 'io-ts'

/** @internal */
type PositiveIntBrand = Brand<{ readonly PositiveInt: unique symbol }['PositiveInt']>

/**
 * Positive integer branded newtype.
 *
 * Represents positive integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z > 0, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 * @category Model
 */
export type PositiveInt = number & PositiveIntBrand

/**
 * @since 1.0.0
 * @category Model
 */
export type PositiveIntS = SchemaExt<number, PositiveInt>

/**
 * Positive integer branded newtype.
 *
 * Represents positive integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z > 0, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 * @category Schema
 */
export const PositiveInt: PositiveIntS = make(S =>
  pipe(S.int({ min: 0 }), S.brand<PositiveIntBrand>())
)

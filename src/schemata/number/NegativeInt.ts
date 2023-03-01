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
import { Branded } from 'schemata-ts/brand'
import { make, Schema } from 'schemata-ts/Schema'

interface NegativeIntBrand {
  readonly NegativeInt: unique symbol
}

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
export type NegativeInt = Branded<number, NegativeIntBrand>

/**
 * @since 1.0.0
 * @category Model
 */
export type NegativeIntS = Schema<number, NegativeInt>

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

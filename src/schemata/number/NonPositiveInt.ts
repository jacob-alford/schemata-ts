/**
 * NonPositive integer branded newtype.
 *
 * Represents integers which are negative or zero.
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 0 }
 * ```
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { Branded } from 'schemata-ts/brand'
import { make, Schema } from 'schemata-ts/Schema'

interface NonPositiveIntBrand {
  readonly NonPositiveInt: unique symbol
}

/**
 * NonPositive integer branded newtype.
 *
 * Represents integers which are negative or zero.
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 0 }
 * ```
 *
 * @since 1.0.0
 * @category Model
 */
export type NonPositiveInt = Branded<number, NonPositiveIntBrand>

/**
 * @since 1.0.0
 * @category Model
 */
export type NonPositiveIntS = Schema<number, NonPositiveInt>

/**
 * NonPositive integer branded newtype.
 *
 * Represents integers which are negative or zero.
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 0 }
 * ```
 *
 * @since 1.0.0
 * @category Schema
 */
export const NonPositiveInt: NonPositiveIntS = make(S =>
  pipe(S.int({ max: 0 }), S.brand<NonPositiveIntBrand>()),
)

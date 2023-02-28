/**
 * Integer branded newtype. Parameters: min, max are inclusive.
 *
 * Represents integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 */
import { Branded } from 'schemata-ts/brand'
import { Kind, TypeLambda } from 'schemata-ts/HKT'

interface IntBrand {
  readonly Int: unique symbol
}

/**
 * Integer branded newtype. Parameters: min, max are inclusive.
 *
 * Represents integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 * @category Model
 */
export type Int = Branded<number, IntBrand>

/**
 * @since 1.0.0
 * @category Model
 */
export type IntParams = {
  readonly min?: number
  readonly max?: number
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithInt<S extends TypeLambda> {
  /**
   * Integer branded newtype. Parameters: min, max are inclusive.
   *
   * Represents integers:
   *
   * ```math
   *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
   * ```
   *
   * @since 1.0.0
   * @category Model
   */
  int: (params?: IntParams) => Kind<S, number, Int>
}

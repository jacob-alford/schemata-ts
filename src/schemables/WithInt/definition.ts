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
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { Branded } from 'io-ts'

/**
 * @since 1.0.0
 * @internal
 */
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
export interface WithIntHKT2<S> {
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
  int: (params?: IntParams) => HKT2<S, number, Int>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithInt1<S extends URIS> {
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
  int: (params?: IntParams) => Kind<S, Int>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithInt2<S extends URIS2> {
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
  int: (params?: IntParams) => Kind2<S, number, Int>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithInt2C<S extends URIS2, E> {
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
  int: (params?: IntParams) => Kind2<S, E, Int>
}

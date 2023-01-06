/**
 * Floating point branded newtype. Parameters: min, max are inclusive.
 *
 * Represents floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { Branded } from 'io-ts'

interface FloatBrand {
  readonly Float: unique symbol
}

/**
 * Floating point branded newtype. Parameters: min, max are inclusive.
 *
 * Represents floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 * @category Model
 */
export type Float = Branded<number, FloatBrand>

/**
 * @since 1.0.0
 * @category Model
 */
export type FloatParams = {
  readonly min?: number
  readonly max?: number
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithFloatHKT2<S> {
  /**
   * Floating point branded newtype. Parameters: min, max are inclusive.
   *
   * Represents floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  float: (params?: FloatParams) => HKT2<S, number, Float>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithFloat1<S extends URIS> {
  /**
   * Floating point branded newtype. Parameters: min, max are inclusive.
   *
   * Represents floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  float: (params?: FloatParams) => Kind<S, Float>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithFloat2<S extends URIS2> {
  /**
   * Floating point branded newtype. Parameters: min, max are inclusive.
   *
   * Represents floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  float: (params?: FloatParams) => Kind2<S, number, Float>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithFloat2C<S extends URIS2, E> {
  /**
   * Floating point branded newtype. Parameters: min, max are inclusive.
   *
   * Represents floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  float: (params?: FloatParams) => Kind2<S, E, Float>
}

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
import { Branded } from 'schemata-ts/brand'
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

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
export interface WithFloat<S extends SchemableLambda> {
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
  float: (params?: FloatParams) => SchemableKind<S, number, Float>
}

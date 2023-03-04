/**
 * Schemable with string, float, int, boolean, null, literal, and unknown
 *
 * @since 2.0.0
 */
import { ReadonlyNonEmptyArray } from 'fp-ts/ReadonlyNonEmptyArray'
import { Branded } from 'schemata-ts/brand'
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

/**
 * The smallest safe integer in JavaScript.
 *
 * @since 2.0.0
 * @category Model
 */
export type MinSafeInt = -9007199254740991

/**
 * The largest safe integer in JavaScript.
 *
 * @since 2.0.0
 * @category Model
 */
export type MaxSafeInt = 9007199254740991

interface IntBrand<Min extends number, Max extends number> {
  readonly Int: unique symbol
  readonly Min: Min
  readonly Max: Max
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
export type Integer<Min extends number, Max extends number> = Branded<
  number,
  IntBrand<Min, Max>
>

/**
 * The smallest positive float in JavaScript.
 *
 * @since 2.0.0
 * @category Model
 */
export type MinPositiveFloat = 5e-324

/**
 * The smallest negative float in JavaScript.
 *
 * @since 2.0.0
 * @category Model
 */
export type MinNegativeFloat = -5e-324

/**
 * The largest positive float in JavaScript.
 *
 * @since 2.0.0
 * @category Model
 */
export type MaxPositiveFloat = 1.7976931348623157e308

/**
 * The largest negative float in JavaScript.
 *
 * @since 2.0.0
 * @category Model
 */
export type MaxNegativeFloat = -1.7976931348623157e308

interface FloatBrand<Min extends number, Max extends number> {
  readonly Float: unique symbol
  readonly Min: Min
  readonly Max: Max
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
export type Float<Min extends number, Max extends number> = Branded<
  number,
  FloatBrand<Min, Max>
>

/**
 * @since 1.0.0
 * @category Model
 */
export type BoundedParams<
  Min extends number | undefined,
  Max extends number | undefined,
> = {
  readonly min?: Min
  readonly max?: Max
}

/**
 * @since 2.0.0
 * @category Model
 */
export type StringParams = {
  readonly minLength?: number
  readonly maxLength?: number
}

/**
 * @since 2.0.0
 * @category Model
 */
export interface WithPrimitives<S extends SchemableLambda> {
  /**
   * Represents string inputs / outputs
   *
   * @since 2.0.0
   */
  readonly string: (params?: StringParams) => SchemableKind<S, string, string>
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
  readonly int: <
    Min extends number | undefined = undefined,
    Max extends number | undefined = undefined,
  >(
    params?: BoundedParams<Min, Max>,
  ) => SchemableKind<
    S,
    number,
    Integer<
      Min extends undefined ? MinSafeInt : Min,
      Max extends undefined ? MaxSafeInt : Max
    >
  >
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
  readonly float: <
    Min extends number | undefined = undefined,
    Max extends number | undefined = undefined,
  >(
    params?: BoundedParams<Min, Max>,
  ) => SchemableKind<
    S,
    number,
    Float<
      Min extends undefined ? MaxNegativeFloat : Min,
      Max extends undefined ? MaxPositiveFloat : Max
    >
  >
  /**
   * Represents boolean inputs / outputs
   *
   * @since 2.0.0
   */
  readonly boolean: SchemableKind<S, boolean, boolean>
  /**
   * Represents an unknown value
   *
   * @since 1.3.0
   */
  readonly unknown: SchemableKind<S, unknown, unknown>
  /**
   * Represents literal values
   *
   * @since 2.0.0
   */
  readonly literal: <
    Literals extends ReadonlyNonEmptyArray<string | number | boolean | null>,
  >(
    ...values: Literals
  ) => SchemableKind<S, Literals[number], Literals[number]>
}

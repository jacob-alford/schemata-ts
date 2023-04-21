import { ReadonlyNonEmptyArray } from 'fp-ts/ReadonlyNonEmptyArray'
import { Float, MaxNegativeFloat, MaxPositiveFloat } from 'schemata-ts/float'
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'
import { Integer, MaxSafeInt, MinSafeInt } from 'schemata-ts/integer'

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

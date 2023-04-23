import { ReadonlyNonEmptyArray } from 'fp-ts/ReadonlyNonEmptyArray'
import { Float, MaxNegativeFloat, MaxPositiveFloat } from 'schemata-ts/float'
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'
import { Integer, MaxSafeInt, MinSafeInt } from 'schemata-ts/integer'

export interface WithPrimitives<S extends SchemableLambda> {
  readonly string: (params?: StringParams) => SchemableKind<S, string, string>
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
  readonly boolean: SchemableKind<S, boolean, boolean>
  readonly unknown: SchemableKind<S, unknown, unknown>
  readonly literal: <
    Literals extends ReadonlyNonEmptyArray<string | number | boolean | null>,
  >(
    ...values: Literals
  ) => SchemableKind<S, Literals[number], Literals[number]>
}

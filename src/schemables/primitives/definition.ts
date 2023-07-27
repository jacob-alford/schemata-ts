import { type ReadonlyNonEmptyArray } from 'fp-ts/ReadonlyNonEmptyArray'
import {
  type Float,
  type MaxNegativeFloat,
  type MaxPositiveFloat,
} from 'schemata-ts/float'
import { type Integer, type MaxSafeInt, type MinSafeInt } from 'schemata-ts/integer'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'

export type NumberParams<
  Min extends number | undefined,
  Max extends number | undefined,
> = {
  readonly min?: Min
  readonly max?: Max
  readonly errorName?: string
  readonly epsilon?: number
}

export type StringParams = {
  readonly minLength?: number
  readonly maxLength?: number
  readonly errorName?: string
}

export interface WithPrimitives<S extends SchemableLambda> {
  readonly string: (params?: StringParams) => SchemableKind<S, string, string>
  readonly int: <
    Min extends number | undefined = undefined,
    Max extends number | undefined = undefined,
  >(
    params?: NumberParams<Min, Max>,
  ) => SchemableKind<
    S,
    Integer<
      Min extends undefined ? MinSafeInt : Min,
      Max extends undefined ? MaxSafeInt : Max
    >,
    Integer<
      Min extends undefined ? MinSafeInt : Min,
      Max extends undefined ? MaxSafeInt : Max
    >
  >
  readonly float: <
    Min extends number | undefined = undefined,
    Max extends number | undefined = undefined,
  >(
    params?: NumberParams<Min, Max>,
  ) => SchemableKind<
    S,
    Float<
      Min extends undefined ? MaxNegativeFloat : Min,
      Max extends undefined ? MaxPositiveFloat : Max
    >,
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

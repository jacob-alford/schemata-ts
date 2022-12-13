/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'

import { InputOf, make, OutputOf, RequirementsOf, Schema } from '../../SchemaExperimental'

/** @internal */
const StringURI = Symbol('WithPrimitives.String')
type StringURI = typeof StringURI

/** @internal */
const NumberURI = Symbol('WithPrimitives.Number')
type NumberURI = typeof NumberURI

/** @internal */
const BooleanURI = Symbol('WithPrimitives.Boolean')
type BooleanURI = typeof BooleanURI

/** @internal */
const StructURI = Symbol('WithPrimitives.Struct')
type StructURI = typeof StructURI

/** @internal */
const ArrayURI = Symbol('WithPrimitives.Array')
type ArrayURI = typeof ArrayURI

type InnerLeftG<S, E extends HKT2<S, any, any>> = E extends HKT2<S, infer L, any>
  ? L
  : never
type InnerRightG<S, A extends HKT2<S, any, any>> = A extends HKT2<S, any, infer R>
  ? R
  : never

type InnerLeft<S extends URIS2, E extends Kind2<S, any, any>> = E extends Kind2<
  S,
  infer L,
  any
>
  ? L
  : never
type InnerRight<S extends URIS2, A extends Kind2<S, any, any>> = A extends Kind2<
  S,
  any,
  infer R
>
  ? R
  : never

/**
 * @since 2.0.0
 * @category Model
 */
export interface WithPrimitives<S> {
  readonly [StringURI]: HKT2<S, string, string>
  readonly [NumberURI]: HKT2<S, number, number>
  readonly [BooleanURI]: HKT2<S, boolean, boolean>
  readonly [StructURI]: <P extends Record<string, HKT2<S, any, any>>>(
    properties: P,
  ) => HKT2<
    S,
    { [K in keyof P]: InnerLeftG<S, P[K]> },
    { [K in keyof P]: InnerRightG<S, P[K]> }
  >
  readonly [ArrayURI]: <O, A>(
    item: HKT2<S, O, A>,
  ) => HKT2<S, ReadonlyArray<O>, ReadonlyArray<A>>
}

/**
 * @since 2.0.0
 * @category Model
 */
export interface WithPrimitives1<S extends URIS> {
  readonly [StringURI]: Kind<S, string>
  readonly [NumberURI]: Kind<S, number>
  readonly [BooleanURI]: Kind<S, boolean>
  readonly [StructURI]: <P extends Record<string, Kind<S, any>>>(
    properties: P,
  ) => Kind<S, { [K in keyof P]: P[K] }>
  readonly [ArrayURI]: <A>(item: Kind<S, A>) => Kind<S, ReadonlyArray<A>>
}

/**
 * @since 2.0.0
 * @category Model
 */
export interface WithPrimitives2<S extends URIS2> {
  readonly [StringURI]: Kind2<S, string, string>
  readonly [NumberURI]: Kind2<S, number, number>
  readonly [BooleanURI]: Kind2<S, boolean, boolean>
  readonly [StructURI]: <P extends Record<string, Kind2<S, any, any>>>(
    properties: P,
  ) => Kind2<
    S,
    { [K in keyof P]: InnerLeft<S, P[K]> },
    { [K in keyof P]: InnerRight<S, P[K]> }
  >
  readonly [ArrayURI]: <O, A>(
    item: Kind2<S, O, A>,
  ) => Kind2<S, ReadonlyArray<O>, ReadonlyArray<A>>
}

/**
 * @since 2.0.0
 * @category Model
 */
export interface WithPrimitives2C<S extends URIS2, E> {
  readonly [StringURI]: Kind2<S, E, string>
  readonly [NumberURI]: Kind2<S, E, number>
  readonly [BooleanURI]: Kind2<S, E, boolean>
  readonly [StructURI]: <A>(properties: { [K in keyof A]: Kind2<S, E, A[K]> }) => Kind2<
    S,
    E,
    { [K in keyof A]: A[K] }
  >
  readonly [ArrayURI]: <A>(item: Kind2<S, E, A>) => Kind2<S, E, ReadonlyArray<A>>
}

/**
 * @since 2.0.0
 * @category Constructors
 */
export const make1 = <S extends URIS>(
  string: WithPrimitives1<S>[StringURI],
  number: WithPrimitives1<S>[NumberURI],
  boolean: WithPrimitives1<S>[BooleanURI],
  struct: WithPrimitives1<S>[StructURI],
  array: WithPrimitives1<S>[ArrayURI],
): WithPrimitives1<S> => ({
  [StringURI]: string,
  [NumberURI]: number,
  [BooleanURI]: boolean,
  [StructURI]: struct,
  [ArrayURI]: array,
})

/**
 * @since 2.0.0
 * @category Constructors
 */
export const make2 = <S extends URIS2>(
  string: WithPrimitives2<S>[StringURI],
  number: WithPrimitives2<S>[NumberURI],
  boolean: WithPrimitives2<S>[BooleanURI],
  struct: WithPrimitives2<S>[StructURI],
  array: WithPrimitives2<S>[ArrayURI],
): WithPrimitives2<S> => ({
  [StringURI]: string,
  [NumberURI]: number,
  [BooleanURI]: boolean,
  [StructURI]: struct,
  [ArrayURI]: array,
})

/**
 * @since 2.0.0
 * @category Constructors
 */
export const make2C = <S extends URIS2, E>(
  string: WithPrimitives2C<S, E>[StringURI],
  number: WithPrimitives2C<S, E>[NumberURI],
  boolean: WithPrimitives2C<S, E>[BooleanURI],
  struct: WithPrimitives2C<S, E>[StructURI],
  array: WithPrimitives2C<S, E>[ArrayURI],
): WithPrimitives2C<S, E> => ({
  [StringURI]: string,
  [NumberURI]: number,
  [BooleanURI]: boolean,
  [StructURI]: struct,
  [ArrayURI]: array,
})

/**
 * @since 2.0.0
 * @category Schemata
 */
export const String = <R extends WithPrimitives<unknown>>(): Schema<R, string, string> =>
  make(S => S[StringURI])

/**
 * @since 2.0.0
 * @category Schemata
 */
export const Number = <R extends WithPrimitives<unknown>>(): Schema<R, number, number> =>
  make(S => S[NumberURI])

/**
 * @since 2.0.0
 * @category Schemata
 */
export const Boolean = <R extends WithPrimitives<unknown>>(): Schema<
  R,
  boolean,
  boolean
> => make(S => S[BooleanURI])

/**
 * @since 2.0.0
 * @category Schemata
 */
export const Struct = <P extends Record<string, Schema<any, any, any>>>(
  properties: P,
): Schema<
  { [K in keyof P]: RequirementsOf<P[K]> }[keyof P],
  { [K in keyof P]: InputOf<P[K]> },
  { [K in keyof P]: OutputOf<P[K]> }
> =>
  make(s => {
    const out = {} as any
    for (const k in properties) {
      out[k] = properties[k]!(s)
    }
    return s[StructURI](out)
  })

/**
 * @since 2.0.0
 * @category Schemata
 */
export const Array = <R extends WithPrimitives<unknown>, E, A>(
  item: Schema<R, E, A>,
): Schema<R, ReadonlyArray<E>, ReadonlyArray<A>> => make(_ => _[ArrayURI](item(_)))

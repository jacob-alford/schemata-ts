import { Kind, TypeLambda } from '@fp-ts/core/HKT'

import { InputOf, makeSchema, OutputOf, Schema } from '../../_Schema'

// ########################################
//  Symbols
// ########################################

/**
 * @since 2.0.0
 * @internal
 */
const PrimitiveURI = Symbol('Primitives')
type PrimitiveURI = typeof PrimitiveURI

/**
 * @since 2.0.0
 * @internal
 */
const StringURI = Symbol('Primitives.String')
type StringURI = typeof StringURI

/**
 * @since 2.0.0
 * @internal
 */
const NumberURI = Symbol('Primitives.Number')
type NumberURI = typeof NumberURI

/**
 * @since 2.0.0
 * @internal
 */
const BooleanURI = Symbol('Primitives.Boolean')
type BooleanURI = typeof BooleanURI

/**
 * @since 2.0.0
 * @internal
 */
const StructURI = Symbol('Primitives.Struct')
type StructURI = typeof StructURI

/**
 * @since 2.0.0
 * @internal
 */
const ArrayURI = Symbol('Primitives.Array')
type ArrayURI = typeof ArrayURI

type InnerInput<
  S extends TypeLambda,
  E extends Kind<S, any, any, any, any>,
> = E extends Kind<S, infer L, any, any, any> ? L : never
type InnerOutput<
  S extends TypeLambda,
  A extends Kind<S, any, any, any, any>,
> = A extends Kind<S, any, any, any, infer R> ? R : never

// ########################################
//  Definition
// ########################################

/**
 * @since 2.0.0
 * @category Model
 */
export interface WithPrimitives<S extends TypeLambda> {
  readonly [StringURI]: Kind<S, string, never, never, string>
  readonly [NumberURI]: Kind<S, number, never, never, number>
  readonly [BooleanURI]: Kind<S, boolean, never, never, boolean>
  readonly [StructURI]: <P extends Record<string, Kind<S, any, any, any, any>>>(
    properties: P,
  ) => Kind<
    S,
    { [K in keyof P]: InnerInput<S, P[K]> },
    never,
    never,
    { [K in keyof P]: InnerOutput<S, P[K]> }
  >
  readonly [ArrayURI]: <O, A>(
    item: Kind<S, O, never, never, A>,
  ) => Kind<S, ReadonlyArray<O>, never, never, ReadonlyArray<A>>
}

declare module '../../_Schema' {
  interface Schemable<S extends TypeLambda> {
    readonly [PrimitiveURI]: WithPrimitives<S>
  }
}

// ########################################
//  Constructors
// ########################################

/**
 * @since 2.0.0
 * @category Constructors
 */
export const make = <S extends TypeLambda>(
  string: WithPrimitives<S>[StringURI],
  number: WithPrimitives<S>[NumberURI],
  boolean: WithPrimitives<S>[BooleanURI],
  struct: WithPrimitives<S>[StructURI],
  array: WithPrimitives<S>[ArrayURI],
): { [PrimitiveURI]: WithPrimitives<S> } => ({
  [PrimitiveURI]: {
    [StringURI]: string,
    [NumberURI]: number,
    [BooleanURI]: boolean,
    [StructURI]: struct,
    [ArrayURI]: array,
  },
})

// ########################################
//  Schemata
// ########################################

/**
 * @since 2.0.0
 * @category Schemata
 */
export const String = makeSchema<string, string>(S => S[PrimitiveURI][StringURI])

/**
 * @since 2.0.0
 * @category Schemata
 */
export const Number = makeSchema<number, number>(S => S[PrimitiveURI][NumberURI])

/**
 * @since 2.0.0
 * @category Schemata
 */
export const Boolean = makeSchema<boolean, boolean>(S => S[PrimitiveURI][BooleanURI])

/**
 * @since 2.0.0
 * @category Schemata
 */
export const Struct = <P extends Record<string, Schema<any, any>>>(
  properties: P,
): Schema<{ [K in keyof P]: InputOf<P[K]> }, { [K in keyof P]: OutputOf<P[K]> }> =>
  makeSchema<{ [K in keyof P]: InputOf<P[K]> }, { [K in keyof P]: OutputOf<P[K]> }>(s => {
    const out = {} as any
    for (const k in properties) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      out[k] = properties[k]!(s)
    }
    return s[PrimitiveURI][StructURI](out) as any
  })

/**
 * @since 2.0.0
 * @category Schemata
 */
export const Array = <I, A>(
  item: Schema<I, A>,
): Schema<ReadonlyArray<I>, ReadonlyArray<A>> =>
  makeSchema<ReadonlyArray<I>, ReadonlyArray<A>>(S => S[PrimitiveURI][ArrayURI](item(S)))

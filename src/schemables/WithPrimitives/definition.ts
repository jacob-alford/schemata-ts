/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kind, TypeClass, TypeLambda } from '@fp-ts/core/HKT'

import {
  ComposeSchemables,
  InputOf,
  makeSchema,
  OutputOf,
  RequirementsOf,
  Schema,
  SchemableLambda,
} from '../../SchemaExperimental'

const StringURI = Symbol('Primitives.String')
type StringURI = typeof StringURI

const NumberURI = Symbol('Primitives.Number')
type NumberURI = typeof NumberURI

const BooleanURI = Symbol('Primitives.Boolean')
type BooleanURI = typeof BooleanURI

const StructURI = Symbol('Primitives.Struct')
type StructURI = typeof StructURI

const ArrayURI = Symbol('Primitives.Array')
type ArrayURI = typeof ArrayURI

type InnerLeft<
  S extends TypeLambda,
  E extends Kind<S, any, any, any, any>,
> = E extends Kind<S, any, any, infer L, any> ? L : never
type InnerRight<
  S extends TypeLambda,
  A extends Kind<S, any, any, any, any>,
> = A extends Kind<S, any, any, any, infer R> ? R : never

/**
 * @since 2.0.0
 * @category Model
 */
export interface WithPrimitives<S extends TypeLambda> extends TypeClass<S> {
  readonly [StringURI]: Kind<S, never, never, string, string>
  readonly [NumberURI]: Kind<S, never, never, number, number>
  readonly [BooleanURI]: Kind<S, never, never, boolean, boolean>
  readonly [StructURI]: <P extends Record<string, Kind<S, any, any, any, any>>>(
    properties: P,
  ) => Kind<
    S,
    never,
    never,
    { [K in keyof P]: InnerLeft<S, P[K]> },
    { [K in keyof P]: InnerRight<S, P[K]> }
  >
  readonly [ArrayURI]: <O, A>(
    item: Kind<S, never, never, O, A>,
  ) => Kind<S, never, never, ReadonlyArray<O>, ReadonlyArray<A>>
}

/**
 * @since 2.0.0
 * @category Type Lambdas
 */
export interface WithPrimitivesLambda extends SchemableLambda {
  readonly type: WithPrimitives<this['Kind']>
}

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
): WithPrimitives<S> => ({
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
export const String = makeSchema<WithPrimitivesLambda, string, string>(S => S[StringURI])

/**
 * @since 2.0.0
 * @category Schemata
 */
export const Number = makeSchema<WithPrimitivesLambda, number, number>(S => S[NumberURI])

/**
 * @since 2.0.0
 * @category Schemata
 */
export const Boolean = makeSchema<WithPrimitivesLambda, boolean, boolean>(
  S => S[BooleanURI],
)

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
  makeSchema<
    { [K in keyof P]: RequirementsOf<P[K]> }[keyof P],
    { [K in keyof P]: InputOf<P[K]> },
    { [K in keyof P]: OutputOf<P[K]> }
  >(s => {
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
export const Array = <R extends SchemableLambda, E, A>(
  item: Schema<R, E, A>,
): Schema<
  ComposeSchemables<WithPrimitivesLambda, R>,
  ReadonlyArray<E>,
  ReadonlyArray<A>
> =>
  makeSchema<
    ComposeSchemables<WithPrimitivesLambda, R>,
    ReadonlyArray<E>,
    ReadonlyArray<A>
  >(S => S[ArrayURI](item(S)))

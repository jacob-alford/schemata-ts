/**
 * Schemable for mapping a struct
 *
 * @since 1.3.0
 */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import {
  KeyFlag,
  KeyNotMapped,
  OptionalKeyFlag,
  Prop,
  Prop1,
  Prop2,
  RequiredKeyFlag,
} from 'schemata-ts/struct'
/* eslint-disable @typescript-eslint/ban-types */

/**
 * Mapped struct configuration determining how to handle extra (non-specified) fields.
 * Default is to strip additional params.
 *
 * Options:
 *
 * - `restParam` - add a rest parameter to the struct
 * - `error` - decode to an error with extra params
 * - `strip` - strips additional params
 *
 * @since 1.3.0
 * @category Model
 */
export type StructOptions<RestKind> =
  | StructWithRestParam<RestKind>
  | StrictStruct
  | StrippedStruct

/**
 * @since 1.3.0
 * @category Model
 */
interface StructWithRestParam<RestKind> {
  readonly extraProps: 'restParam'
  readonly restParam: RestKind
}

/**
 * @since 1.3.0
 * @category Model
 */
interface StrictStruct {
  readonly extraProps: 'error'
}

/**
 * @since 1.3.0
 * @category Model
 */
interface StrippedStruct {
  readonly extraProps: 'strip'
}

// #region Type Helpers
type Combine<A> = {
  [K in keyof A]: A[K]
} extends infer B
  ? B
  : never

type OptionalProps<T> = {
  [K in keyof T]: T[K] extends { readonly _flag: OptionalKeyFlag } ? K : never
}[keyof T]

type RequiredProps<T> = {
  [K in keyof T]: T[K] extends { readonly _flag: RequiredKeyFlag } ? K : never
}[keyof T]

type RemapKey<KeyIn, Prop> = Prop extends { readonly _keyRemap: infer KeyOut }
  ? KeyOut extends KeyNotMapped
    ? KeyIn
    : KeyOut
  : never

type InnerValue1<S extends URIS, Prop> = Prop extends {
  readonly _val: infer Val
}
  ? Val extends Kind<S, infer A>
    ? A
    : never
  : never

type RestValue1<S extends URIS, RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends Kind<S, infer A> ? A : never } | {}

type InputHKT2<S, Prop> = Prop extends {
  readonly _val: infer Val
}
  ? Val extends HKT2<S, infer E, any>
    ? E
    : never
  : never

type OutputHKT2<S, Prop> = Prop extends {
  readonly _val: infer Val
}
  ? Val extends HKT2<S, any, infer A>
    ? A
    : never
  : never

type RestInputHKT2<S, RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends HKT2<S, infer E, any> ? E : never } | {}

type RestOutputHKT2<S, RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends HKT2<S, any, infer A> ? A : never } | {}

type Input2<S extends URIS2, Prop> = Prop extends {
  readonly _val: infer Val
}
  ? Val extends Kind2<S, infer E, any>
    ? E
    : never
  : never

type Output2<S extends URIS2, Prop> = Prop extends {
  readonly _val: infer Val
}
  ? Val extends Kind2<S, any, infer A>
    ? A
    : never
  : never

type RestInput2<S extends URIS2, RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends Kind2<S, infer E, any> ? E : never } | {}

type RestOutput2<S extends URIS2, RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends Kind2<S, any, infer A> ? A : never } | {}

// #endregion

/**
 * @since 1.3.0
 * @category Model
 */
export interface WithStructMHKT2<S> {
  readonly structM: <
    Props extends Record<
      string,
      Prop<KeyFlag, S, HKT2<S, unknown, unknown>, string | KeyNotMapped>
    >,
    RestKind extends HKT2<S, any, any> | undefined,
  >(
    properties: Props,
    params?: StructOptions<RestKind>,
  ) => HKT2<
    S,
    Combine<
      RestInputHKT2<S, RestKind> & {
        [K in RequiredProps<Props>]: InputHKT2<S, Props[K]>
      } & {
        [K in OptionalProps<Props>]?: InputHKT2<S, Props>
      }
    >,
    Combine<
      RestOutputHKT2<S, RestKind> & {
        [K in RequiredProps<Props> as RemapKey<K, Props[K]>]: OutputHKT2<S, Props[K]>
      } & {
        [K in OptionalProps<Props> as RemapKey<K, Props[K]>]?: OutputHKT2<S, Props[K]>
      }
    >
  >
}

/**
 * @since 1.3.0
 * @category Model
 */
export interface WithStructM1<S extends URIS> {
  readonly structM: <
    Props extends Record<string, Prop1<KeyFlag, S, Kind<S, any>, string | KeyNotMapped>>,
    RestKind extends Kind<S, any> | undefined,
  >(
    properties: Props,
    params?: StructOptions<RestKind>,
  ) => Kind<
    S,
    Combine<
      RestValue1<S, RestKind> & {
        [K in RequiredProps<Props> as RemapKey<K, Props[K]>]: InnerValue1<S, Props[K]>
      } & {
        [K in OptionalProps<Props> as RemapKey<K, Props[K]>]?: InnerValue1<S, Props[K]>
      }
    >
  >
}

/**
 * @since 1.3.0
 * @category Model
 */
export interface WithStructM2<S extends URIS2> {
  readonly structM: <
    Props extends Record<
      string,
      Prop2<KeyFlag, S, Kind2<S, any, any>, string | KeyNotMapped>
    >,
    RestKind extends Kind2<S, any, any> | undefined,
  >(
    properties: Props,
    params?: StructOptions<RestKind>,
  ) => Kind2<
    S,
    Combine<
      RestInput2<S, RestKind> & {
        [K in RequiredProps<Props>]: Input2<S, Props[K]>
      } & {
        [K in OptionalProps<Props>]?: Input2<S, Props[K]>
      }
    >,
    Combine<
      RestOutput2<S, RestKind> & {
        [K in RequiredProps<Props> as RemapKey<K, Props[K]>]: Output2<S, Props[K]>
      } & {
        [K in OptionalProps<Props> as RemapKey<K, Props[K]>]?: Output2<S, Props[K]>
      }
    >
  >
}

/**
 * @since 1.3.0
 * @category Model
 */
export interface WithStructM2C<S extends URIS2, E> {
  readonly structM: <
    Props extends Record<
      string,
      Prop2<KeyFlag, S, Kind2<S, E, unknown>, string | KeyNotMapped>
    >,
    RestKind extends Kind2<S, any, any> | undefined,
  >(
    properties: Props,
    params?: StructOptions<RestKind>,
  ) => Kind2<
    S,
    E,
    Combine<
      RestOutput2<S, RestKind> & {
        [K in RequiredProps<Props> as RemapKey<K, Props[K]>]: Output2<S, Props[K]>
      } & {
        [K in OptionalProps<Props> as RemapKey<K, Props[K]>]?: Output2<S, Props[K]>
      }
    >
  >
}

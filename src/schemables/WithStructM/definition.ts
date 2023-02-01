/**
 * Schemable for mapping a struct
 *
 * @since 1.3.0
 */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
/* eslint-disable @typescript-eslint/ban-types */

const OptionalKeyFlag = Symbol()
/** @internal */
export type OptionalKeyFlag = typeof OptionalKeyFlag

const RequiredKeyFlag = Symbol()
/** @internal */
export type RequiredKeyFlag = typeof RequiredKeyFlag

const KeyNotMapped = Symbol()
/** @internal */
export type KeyNotMapped = typeof KeyNotMapped

/**
 * @since 1.3.0
 * @category Model
 */
export type KeyFlag = OptionalKeyFlag | RequiredKeyFlag

/**
 * Meta information for an HKT2 for if the key is optional or required, and if the key is remapped
 *
 * @since 1.3.0
 * @category Model
 */
export interface Prop<
  Flag extends KeyFlag,
  S,
  Val extends HKT2<S, any, any>,
  K extends string | KeyNotMapped,
> {
  readonly _flag: Flag
  readonly _keyRemap: K
  readonly _val: Val
}

/**
 * Meta information for a Kind for if the key is optional or required, and if the key is remapped
 *
 * @since 1.3.0
 * @category Model
 */
export interface Prop1<
  Flag extends KeyFlag,
  S extends URIS,
  Val extends Kind<S, any>,
  K extends string | KeyNotMapped,
> {
  readonly _flag: Flag
  readonly _keyRemap: K
  readonly _val: Val
}

/**
 * Meta information for a Kind2 for if the key is optional or required, and if the key is remapped
 *
 * @since 1.3.0
 * @category Model
 */
export interface Prop2<
  Flag extends KeyFlag,
  S extends URIS2,
  Val extends Kind2<S, any, any>,
  K extends string | KeyNotMapped,
> {
  readonly _flag: Flag
  readonly _keyRemap: K
  readonly _val: Val
}

type Required = {
  /**
   * Used to indicate that a property is required
   *
   * @since 1.3.0
   */
  <S extends URIS2, Val extends Kind2<S, any, any>>(val: Val): Prop2<
    RequiredKeyFlag,
    S,
    Val,
    KeyNotMapped
  >
  /**
   * Used to indicate that a property is required
   *
   * @since 1.3.0
   */
  <S extends URIS, Val extends Kind<S, any>>(val: Val): Prop1<
    RequiredKeyFlag,
    S,
    Val,
    KeyNotMapped
  >
  /**
   * Used to indicate that a property is required
   *
   * @since 1.3.0
   */
  <S, Val extends HKT2<S, any, any>>(val: Val): Prop<
    RequiredKeyFlag,
    S,
    Val,
    KeyNotMapped
  >
}

/** @internal */
const required: Required = (val: any) =>
  ({
    _flag: RequiredKeyFlag,
    _keyRemap: KeyNotMapped,
    _val: val,
  } as any)

/**
 * @since 1.3.0
 * @category Guards
 */
export const isRequiredFlag = (flag: KeyFlag): flag is RequiredKeyFlag =>
  flag === RequiredKeyFlag

type Optional = {
  /**
   * Used to indicate that a property is optional
   *
   * @since 1.3.0
   */
  <S extends URIS2, Val extends Kind2<S, any, any>>(val: Val): Prop2<
    OptionalKeyFlag,
    S,
    Val,
    KeyNotMapped
  >
  /**
   * Used to indicate that a property is optional
   *
   * @since 1.3.0
   */
  <S extends URIS, Val extends Kind<S, any>>(val: Val): Prop1<
    OptionalKeyFlag,
    S,
    Val,
    KeyNotMapped
  >
  /**
   * Used to indicate that a property is optional
   *
   * @since 1.3.0
   */
  <S, Val extends HKT2<S, any, any>>(val: Val): Prop<
    OptionalKeyFlag,
    S,
    Val,
    KeyNotMapped
  >
}

/** @internal */
const optional: Optional = (val: any) =>
  ({
    _flag: OptionalKeyFlag,
    _keyRemap: KeyNotMapped,
    _val: val,
  } as any)

type MapKeyTo = {
  /**
   * Used to remap a property's key to a new key in the output type
   *
   * @since 1.3.0
   */
  <K extends string>(mapTo: K): <
    Flag extends KeyFlag,
    S extends URIS2,
    Val extends Kind2<S, any, any>,
  >(
    prop: Prop2<Flag, S, Val, KeyNotMapped>,
  ) => Prop2<Flag, S, Val, K>
  /**
   * Used to remap a property's key to a new key in the output type
   *
   * @since 1.3.0
   */
  <K extends string>(mapTo: K): <
    Flag extends KeyFlag,
    S extends URIS,
    Val extends Kind<S, any>,
  >(
    prop: Prop1<Flag, S, Val, KeyNotMapped>,
  ) => Prop1<Flag, S, Val, K>
  /**
   * Used to remap a property's key to a new key in the output type
   *
   * @since 1.3.0
   */
  <K extends string>(mapTo: K): <Flag extends KeyFlag, S, Val extends HKT2<S, any, any>>(
    prop: Prop<Flag, S, Val, KeyNotMapped>,
  ) => Prop<Flag, S, Val, K>
}

/**
 * @since 1.3.0
 * @category Guards
 */
export const isOptionalFlag = (flag: KeyFlag): flag is OptionalKeyFlag =>
  flag === OptionalKeyFlag

/** @internal */
const mapKeyTo: MapKeyTo = mapTo => (prop: any) => ({
  ...prop,
  _keyRemap: mapTo,
})

/**
 * @since 1.3.0
 * @category Guards
 */
export const keyIsNotMapped = (key: string | KeyNotMapped): key is KeyNotMapped =>
  key === KeyNotMapped

type Combine<A> = {
  [K in keyof A]: A[K]
} extends infer B
  ? B
  : never

/**
 * @since 1.3.0
 * @category Model
 */
export interface StructTools {
  readonly required: Required
  readonly optional: Optional
  readonly mapKeyTo: MapKeyTo
}

/** @internal */
export const structTools: StructTools = {
  required,
  optional,
  mapKeyTo,
}

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
    properties: (_: StructTools) => Props,
    params?: StructOptions<RestKind>,
  ) => HKT2<
    S,
    Combine<
      (RestKind extends undefined
        ? unknown
        : { [key: string]: RestKind extends HKT2<S, infer I, any> ? I : never } | {}) & {
        [K in keyof Props as Props[K] extends { readonly _flag: infer Flag }
          ? Flag extends RequiredKeyFlag
            ? K
            : never
          : never]: Props[K] extends { readonly _val: infer Val }
          ? Val extends HKT2<S, infer E, any>
            ? E
            : never
          : never
      } & {
        [K in keyof Props as Props[K] extends { readonly _flag: infer Flag }
          ? Flag extends OptionalKeyFlag
            ? K
            : never
          : never]?: Props[K] extends { readonly _val: infer Val }
          ? Val extends HKT2<S, infer E, any>
            ? E
            : never
          : never
      }
    >,
    Combine<
      (RestKind extends undefined
        ? unknown
        : { [key: string]: RestKind extends HKT2<S, any, infer A> ? A : never } | {}) & {
        [K in keyof Props as Props[K] extends {
          readonly _flag: infer Flag
          readonly _keyRemap: infer KOut
        }
          ? Flag extends RequiredKeyFlag
            ? KOut extends KeyNotMapped
              ? K
              : KOut
            : never
          : never]: Props[K] extends { readonly _val: infer Val }
          ? Val extends HKT2<S, any, infer A>
            ? A
            : never
          : never
      } & {
        [K in keyof Props as Props[K] extends {
          readonly _flag: infer Flag
          readonly _keyRemap: infer KOut
        }
          ? Flag extends OptionalKeyFlag
            ? KOut extends KeyNotMapped
              ? K
              : KOut
            : never
          : never]: Props[K] extends { readonly _val: infer Val }
          ? Val extends HKT2<S, any, infer A>
            ? A
            : never
          : never
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
    properties: (_: StructTools) => Props,
    params?: StructOptions<RestKind>,
  ) => Kind<
    S,
    Combine<
      (RestKind extends undefined
        ? unknown
        : { [key: string]: RestKind extends Kind<S, infer A> ? A : never } | {}) & {
        [K in keyof Props as Props[K] extends {
          readonly _flag: infer Flag
        }
          ? Flag extends RequiredKeyFlag
            ? K
            : never
          : never]: Props[K] extends { readonly _val: infer Val }
          ? Val extends Kind<S, infer A>
            ? A
            : never
          : never
      } & {
        [K in keyof Props as Props[K] extends {
          readonly _flag: infer Flag
        }
          ? Flag extends OptionalKeyFlag
            ? K
            : never
          : never]?: Props[K] extends { readonly _val: infer Val }
          ? Val extends Kind<S, infer A>
            ? A
            : never
          : never
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
    properties: (_: StructTools) => Props,
    params?: StructOptions<RestKind>,
  ) => Kind2<
    S,
    Combine<
      (RestKind extends undefined
        ? unknown
        : { [key: string]: RestKind extends Kind2<S, infer I, any> ? I : never } | {}) & {
        [K in keyof Props as Props[K] extends { readonly _flag: infer Flag }
          ? Flag extends RequiredKeyFlag
            ? K
            : never
          : never]: Props[K] extends { readonly _val: infer Val }
          ? Val extends Kind2<S, infer E, any>
            ? E
            : never
          : never
      } & {
        [K in keyof Props as Props[K] extends { readonly _flag: infer Flag }
          ? Flag extends OptionalKeyFlag
            ? K
            : never
          : never]?: Props[K] extends { readonly _val: infer Val }
          ? Val extends Kind2<S, infer E, any>
            ? E
            : never
          : never
      }
    >,
    Combine<
      (RestKind extends undefined
        ? unknown
        : { [key: string]: RestKind extends Kind2<S, any, infer A> ? A : never } | {}) & {
        [K in keyof Props as Props[K] extends {
          readonly _flag: infer Flag
          readonly _keyRemap: infer KOut
        }
          ? Flag extends RequiredKeyFlag
            ? KOut extends KeyNotMapped
              ? K
              : KOut
            : never
          : never]: Props[K] extends { readonly _val: infer Val }
          ? Val extends Kind2<S, any, infer A>
            ? A
            : never
          : never
      } & {
        [K in keyof Props as Props[K] extends {
          readonly _flag: infer Flag
          readonly _keyRemap: infer KOut
        }
          ? Flag extends OptionalKeyFlag
            ? KOut extends KeyNotMapped
              ? K
              : KOut
            : never
          : never]?: Props[K] extends { readonly _val: infer Val }
          ? Val extends Kind2<S, any, infer A>
            ? A
            : never
          : never
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
    properties: (_: StructTools) => Props,
    params?: StructOptions<RestKind>,
  ) => Kind2<
    S,
    E,
    Combine<
      (RestKind extends undefined
        ? unknown
        :
            | {
                [key: string]: RestKind extends Kind2<S, any, infer A> ? A : never
              }
            | {}) & {
        [K in keyof Props as Props[K] extends {
          readonly _flag: infer Flag
          readonly _keyRemap: infer KOut
        }
          ? Flag extends RequiredKeyFlag
            ? KOut extends KeyNotMapped
              ? K
              : KOut
            : never
          : never]: Props[K] extends { readonly _val: infer Val }
          ? Val extends Kind2<S, any, infer A>
            ? A
            : never
          : never
      } & {
        [K in keyof Props as Props[K] extends {
          readonly _flag: infer Flag
          readonly _keyRemap: infer KOut
        }
          ? Flag extends OptionalKeyFlag
            ? KOut extends KeyNotMapped
              ? K
              : KOut
            : never
          : never]?: Props[K] extends { readonly _val: infer Val }
          ? Val extends Kind2<S, any, infer A>
            ? A
            : never
          : never
      }
    >
  >
}

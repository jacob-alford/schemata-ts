/**
 * A meta definition for a struct for use with `StructM` schema
 *
 * @since 1.3.0
 */
import { identity } from 'fp-ts/function'
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { URI } from 'schemata-ts/base/SchemaBase'

/**
 * @since 1.3.0
 * @category Model
 */
export type OptionalKeyFlag = typeof OptionalKeyFlag
const OptionalKeyFlag = Symbol()

/**
 * @since 1.3.0
 * @category Model
 */
export type RequiredKeyFlag = typeof RequiredKeyFlag
const RequiredKeyFlag = Symbol()

/**
 * @since 1.3.0
 * @category Model
 */
export type KeyNotMapped = typeof KeyNotMapped
const KeyNotMapped = Symbol()

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

/**
 * Indicates that a property is required
 *
 * @since 1.3.0
 * @category Constructors
 */
export const requiredProp: Required = (val: any) =>
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

/**
 * Indicates that a property is optional
 *
 * @since 1.3.0
 * @category Constructors
 */
export const optionalProp: Optional = (val: any) =>
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

/**
 * Used to remap a property's key to a new key in the output type
 *
 * @since 1.3.0
 * @category Constructors
 */
export const mapKeyTo: MapKeyTo = mapTo => (prop: any) => ({
  ...prop,
  _keyRemap: mapTo,
})

/**
 * @since 1.3.0
 * @category Guards
 */
export const keyIsNotMapped = (key: string | KeyNotMapped): key is KeyNotMapped =>
  key === KeyNotMapped

/**
 * @since 1.3.0
 * @category Models
 */
export interface StructDefinition {
  <Props extends Record<string, Prop2<KeyFlag, URI, any, string | KeyNotMapped>>>(
    props: Props,
  ): Props
}

/**
 * @since 1.3.0
 * @category Models
 */
export const defineStruct: StructDefinition = identity

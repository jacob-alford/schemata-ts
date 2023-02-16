/**
 * A meta definition for a struct for use with `StructM` schema
 *
 * @since 1.3.0
 */
import { identity } from 'fp-ts/function'
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { camelCase } from 'schemata-ts/internal/camelcase'
import type { CamelCase } from 'type-fest'

/**
 * @since 1.3.0
 * @category Model
 */
export type OptionalKeyFlag = 'Optional'
const OptionalKeyFlag: OptionalKeyFlag = 'Optional'

/**
 * @since 1.3.0
 * @category Model
 */
export type RequiredKeyFlag = 'Required'
const RequiredKeyFlag: RequiredKeyFlag = 'Required'

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

interface Required {
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
export const required: Required = (val: any) =>
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

interface Optional {
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
export const optional: Optional = (val: any) =>
  ({
    _flag: OptionalKeyFlag,
    _keyRemap: KeyNotMapped,
    _val: val,
  } as any)

interface MapKeyTo {
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
 * @category Combinators
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
 * A type-level key remap provider
 *
 * @since 1.4.0
 * @category Models
 */
export interface KeyRemapLambda {
  readonly input: string
  readonly output: string
}

/**
 * Applies a remap type-level function to a remap lambda
 *
 * @since 1.4.0
 * @category Models
 */
export type ApplyKeyRemap<R extends KeyRemapLambda, Val extends string> = R extends {
  readonly input: string
}
  ? (R & {
      readonly input: Val
    })['output']
  : {
      readonly R: R
      readonly input: (val: Val) => Val
    }

interface MapKeysWith {
  /**
   * Used to remap a struct's keys using a provided type-level function and equivalent string mapper
   *
   * @since 1.4.0
   */
  <R extends KeyRemapLambda>(
    mapping: <S extends string>(s: S) => ApplyKeyRemap<KeyRemapLambda, S>,
  ): <
    S extends URIS2,
    Props extends Record<
      string,
      Prop2<KeyFlag, S, Kind2<S, any, any>, string | KeyNotMapped>
    >,
  >(
    props: Props,
  ) => {
    [K in keyof Props]: Props[K] extends Prop2<infer Flag, any, infer Val, infer Remap>
      ? Remap extends KeyNotMapped
        ? Prop2<Flag, S, Val, ApplyKeyRemap<R, K & string>>
        : Prop2<Flag, S, Val, ApplyKeyRemap<R, Remap & string>>
      : never
  }
  /**
   * Used to remap a struct's keys using a provided type-level function and equivalent string mapper
   *
   * @since 1.4.0
   */
  <R extends KeyRemapLambda>(
    mapping: <S extends string>(s: S) => ApplyKeyRemap<KeyRemapLambda, S>,
  ): <
    S extends URIS,
    Props extends Record<string, Prop1<KeyFlag, S, Kind<S, any>, string | KeyNotMapped>>,
  >(
    props: Props,
  ) => {
    [K in keyof Props]: Props[K] extends Prop1<infer Flag, any, infer Val, infer Remap>
      ? Remap extends KeyNotMapped
        ? Prop1<Flag, S, Val, ApplyKeyRemap<R, K & string>>
        : Prop1<Flag, S, Val, ApplyKeyRemap<R, Remap & string>>
      : never
  }
  /**
   * Used to remap a struct's keys using a provided type-level function and equivalent string mapper
   *
   * @since 1.4.0
   */
  <R extends KeyRemapLambda>(
    mapping: <S extends string>(s: S) => ApplyKeyRemap<KeyRemapLambda, S>,
  ): <
    S,
    Props extends Record<
      string,
      Prop<KeyFlag, S, HKT2<S, any, any>, string | KeyNotMapped>
    >,
  >(
    props: Props,
  ) => {
    [K in keyof Props]: Props[K] extends Prop<infer Flag, any, infer Val, infer Remap>
      ? Remap extends KeyNotMapped
        ? Prop<Flag, S, Val, ApplyKeyRemap<R, K & string>>
        : Prop<Flag, S, Val, ApplyKeyRemap<R, Remap & string>>
      : never
  }
}

/**
 * Remap a struct's keys using provided RemapLambda, and string-mapping function
 *
 * @since 1.4.0
 * @category Combinators
 * @example
 *   import * as E from 'fp-ts/Either'
 *   import { pipe } from 'fp-ts/function'
 *   import { getDecoder } from 'schemata-ts/Decoder'
 *   import * as S from 'schemata-ts/schemata'
 *   import * as s from 'schemata-ts/struct'
 *
 *   interface CapitalizeLambda extends s.KeyRemapLambda {
 *     readonly output: Capitalize<this['input']>
 *   }
 *
 *   const capitalize: (s: string) => string = s =>
 *     `${s.substring(0, 1).toUpperCase()}${s.substring(1)}`
 *
 *   const MappedStructDecoder = pipe(
 *     s.defineStruct({
 *       foo: s.required(S.String),
 *       bar: s.optional(S.Number),
 *       qux: s.optional(S.Boolean),
 *     }),
 *     s.mapKeysWith<CapitalizeLambda>(capitalize),
 *     S.StructM,
 *     getDecoder,
 *   )
 *
 *   assert.deepStrictEqual(
 *     MappedStructDecoder.decode({ foo: 'foo', bar: 1 }),
 *     E.right({ Foo: 'foo', Bar: 1 }),
 *   )
 */
export const mapKeysWith: MapKeysWith =
  mapping => (props: Record<string, Prop<KeyFlag, unknown, any, any>>) => {
    const remappedProps: any = {}
    for (const key in props) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const prop = props[key]!
      remappedProps[key] = {
        ...prop,
        _keyRemap: keyIsNotMapped(prop._keyRemap)
          ? mapping(key)
          : mapping(prop._keyRemap),
      }
    }
    return remappedProps
  }

/**
 * A KeyRemapLambda for remapping keys to camelCase
 *
 * @since 1.4.0
 * @category Combinators
 */
export interface CamelCaseLambda extends KeyRemapLambda {
  readonly output: CamelCase<this['input'], { preserveConsecutiveUppercase: true }>
}

/**
 * Remap a struct's non-camel-cased-keys into camelCase
 *
 * @since 1.4.0
 * @category Combinators
 * @example
 *   import * as E from 'fp-ts/Either'
 *   import { getDecoder } from 'schemata-ts/Decoder'
 *   import * as S from 'schemata-ts/schemata'
 *   import * as s from 'schemata-ts/struct'
 *
 *   const camelFromMixed = s.camelCaseKeys(
 *     s.defineStruct({
 *       foo_bar: s.required(S.String),
 *       'bar-qux': s.optional(S.Number),
 *       '--foo_baz-dan___': s.optional(S.Boolean),
 *     }),
 *   )
 *
 *   const DecoderMapMixedToCamel = getDecoder(S.StructM(camelFromMixed))
 *
 *   assert.deepStrictEqual(
 *     DecoderMapMixedToCamel.decode({
 *       foo_bar: 'foo',
 *       'bar-qux': 1,
 *       '--foo_baz-dan___': true,
 *     }),
 *     E.right({ fooBar: 'foo', barQux: 1, fooBazDan: true }),
 *   )
 */
export const camelCaseKeys = mapKeysWith<CamelCaseLambda>(camelCase)

interface StructDefinition {
  /**
   * A convenience function to declare reusable struct definitions with type-safety
   * without first plugging into StructM
   *
   * @since 1.3.0
   * @category Models
   */
  <
    S extends URIS2,
    Props extends Record<
      string,
      Prop2<KeyFlag, S, Kind2<S, any, any>, string | KeyNotMapped>
    >,
  >(
    props: Props,
  ): Props
  /**
   * A convenience function to declare reusable struct definitions with type-safety
   * without first plugging into StructM
   *
   * @since 1.3.0
   * @category Models
   */
  <
    S extends URIS,
    Props extends Record<string, Prop1<KeyFlag, S, Kind<S, any>, string | KeyNotMapped>>,
  >(
    props: Props,
  ): Props
  /**
   * A convenience function to declare reusable struct definitions with type-safety
   * without first plugging into StructM
   *
   * @since 1.3.0
   * @category Models
   */
  <
    S,
    Props extends Record<
      string,
      Prop<KeyFlag, S, HKT2<S, any, any>, string | KeyNotMapped>
    >,
  >(
    props: Props,
  ): Props
}

/**
 * @since 1.3.0
 * @category Constructors
 */
export const defineStruct: StructDefinition = identity

interface Struct {
  /**
   * A convenience function to declare a struct where all keys are required
   *
   * @since 1.4.0
   * @category Models
   */
  <S extends URIS2, Props extends Record<string, Kind2<S, any, any>>>(props: Props): {
    [K in keyof Props]: Prop2<RequiredKeyFlag, S, Props[K], KeyNotMapped>
  }
  /**
   * A convenience function to declare a struct where all keys are required
   *
   * @since 1.4.0
   * @category Models
   */
  <S extends URIS, Props extends Record<string, Kind<S, any>>>(props: Props): {
    [K in keyof Props]: Prop1<RequiredKeyFlag, S, Props[K], KeyNotMapped>
  }
  /**
   * A convenience function to declare a struct where all keys are required
   *
   * @since 1.4.0
   * @category Models
   */
  <S, Props extends Record<string, HKT2<S, any, any>>>(props: Props): {
    [K in keyof Props]: Prop<RequiredKeyFlag, S, Props[K], KeyNotMapped>
  }
}

/**
 * Defines a StructM declaration where all keys are required
 *
 * @since 1.4.0
 * @category Constructors
 */
export const struct: Struct = (props: Record<string, HKT2<unknown, any, any>>) => {
  const remappedProps: Record<
    string,
    Prop<RequiredKeyFlag, unknown, HKT2<unknown, any, any>, KeyNotMapped>
  > = {}
  for (const key in props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const prop = props[key]!
    remappedProps[key] = {
      _val: prop,
      _keyRemap: KeyNotMapped,
      _flag: RequiredKeyFlag,
    }
  }
  return remappedProps
}

interface Partial {
  /**
   * Remap a StructM definition such that all keys are optional
   *
   * @since 1.3.0
   * @category Models
   */
  <
    S extends URIS2,
    Props extends Record<
      string,
      Prop2<KeyFlag, S, Kind2<S, unknown, unknown>, string | KeyNotMapped>
    >,
  >(
    props: Props,
  ): {
    [K in keyof Props]: Props[K] extends Prop2<any, any, infer Val, infer Remap>
      ? Prop2<OptionalKeyFlag, S, Val, Remap>
      : never
  }
  /**
   * Remap a StructM definition such that all keys are optional
   *
   * @since 1.3.0
   * @category Models
   */
  <
    S extends URIS,
    Props extends Record<
      string,
      Prop1<KeyFlag, S, Kind<S, unknown>, string | KeyNotMapped>
    >,
  >(
    props: Props,
  ): {
    [K in keyof Props]: Props[K] extends Prop1<any, any, infer Val, infer Remap>
      ? Prop1<OptionalKeyFlag, S, Val, Remap>
      : never
  }
  /**
   * Remap a StructM definition such that all keys are optional
   *
   * @since 1.3.0
   * @category Models
   */
  <
    S,
    Props extends Record<
      string,
      Prop<KeyFlag, S, HKT2<S, unknown, unknown>, string | KeyNotMapped>
    >,
  >(
    props: Props,
  ): {
    [K in keyof Props]: Props[K] extends Prop<any, any, infer Val, infer Remap>
      ? Prop<OptionalKeyFlag, S, Val, Remap>
      : never
  }
}

/**
 * Marks all properties as optional
 *
 * @since 1.3.0
 * @category Utilities
 */
export const partial: Partial = (
  props: Record<
    string,
    Prop<KeyFlag, URIS2, HKT2<URIS2, unknown, unknown>, string | KeyNotMapped>
  >,
) => {
  const result: Record<
    string,
    Prop<KeyFlag, URIS2, HKT2<URIS2, unknown, unknown>, string | KeyNotMapped>
  > = {}
  for (const key in props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const prop = props[key]!
    result[key] = { ...prop, _flag: OptionalKeyFlag }
  }
  return result as any
}

interface Complete {
  /**
   * Remap a StructM definition such that all keys are required
   *
   * @since 1.3.0
   * @category Models
   */
  <
    S extends URIS2,
    Props extends Record<
      string,
      Prop2<KeyFlag, S, Kind2<S, unknown, unknown>, string | KeyNotMapped>
    >,
  >(
    props: Props,
  ): {
    [K in keyof Props]: Props[K] extends Prop2<any, any, infer Val, infer Remap>
      ? Prop2<RequiredKeyFlag, S, Val, Remap>
      : never
  }
  /**
   * Remap a StructM definition such that all keys are required
   *
   * @since 1.3.0
   * @category Models
   */
  <
    S extends URIS,
    Props extends Record<
      string,
      Prop1<KeyFlag, S, Kind<S, unknown>, string | KeyNotMapped>
    >,
  >(
    props: Props,
  ): {
    [K in keyof Props]: Props[K] extends Prop1<any, any, infer Val, infer Remap>
      ? Prop1<RequiredKeyFlag, S, Val, Remap>
      : never
  }
  /**
   * Remap a StructM definition such that all keys are required
   *
   * @since 1.3.0
   * @category Models
   */
  <
    S,
    Props extends Record<
      string,
      Prop<KeyFlag, S, HKT2<S, unknown, unknown>, string | KeyNotMapped>
    >,
  >(
    props: Props,
  ): {
    [K in keyof Props]: Props[K] extends Prop<any, any, infer Val, infer Remap>
      ? Prop<RequiredKeyFlag, S, Val, Remap>
      : never
  }
}

/**
 * Marks all properties as required.
 *
 * @since 1.3.0
 * @category Utilities
 */
export const complete: Complete = (
  props: Record<
    string,
    Prop<KeyFlag, URIS2, HKT2<URIS2, unknown, unknown>, string | KeyNotMapped>
  >,
) => {
  const result: Record<
    string,
    Prop<KeyFlag, URIS2, HKT2<URIS2, unknown, unknown>, string | KeyNotMapped>
  > = {}
  for (const key in props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const prop = props[key]!
    result[key] = { ...prop, _flag: RequiredKeyFlag }
  }
  return result as any
}

/**
 * Include only a specified set of keys of an object. Built for StructM but works with any struct
 *
 * @since 1.3.0
 * @category Utilities
 */
export const pick =
  <
    A extends Record<string, unknown>,
    Keys extends [keyof A, ...ReadonlyArray<Exclude<keyof A, Keys[0]>>],
  >(
    ...keys: Keys
  ) =>
  (obj: A): { [K in Keys[number]]: A[K] } => {
    const result: any = {}
    for (const key of keys) {
      result[key] = obj[key]
    }
    return result
  }

/**
 * Exclude a set of keys from an object. Built for StructM but works with any struct
 *
 * @since 1.3.0
 * @category Utilities
 */
export const omit: <
  A extends Record<string, unknown>,
  Keys extends [keyof A, ...ReadonlyArray<Exclude<keyof A, Keys[0]>>],
>(
  ...omittedKeys: Keys
) => (obj: A) => { [K in Exclude<keyof A, Keys[number]>]: A[K] } = (...omittedKeys) => {
  return obj => {
    const result: any = {}
    for (const key in obj) {
      if (omittedKeys.includes(key)) continue
      result[key] = obj[key]
    }
    return result
  }
}

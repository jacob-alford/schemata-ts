/**
 * A meta definition for a struct for use with `StructM` schema
 *
 * @since 1.3.0
 */
import { identity, pipe, unsafeCoerce } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/HKT'
import { camelCase } from 'schemata-ts/internal/camelcase'
import { hasOwn } from 'schemata-ts/internal/util'
import type { CamelCase } from 'type-fest'

type ImplicitOptionalFlag = typeof ImplicitOptionalFlag
const ImplicitOptionalFlag = Symbol.for('schemata-ts/struct/ImplicitOptionalFlag')

/**
 * Determines types for whose key is optional
 *
 * @since 2.0.0
 */
export interface ImplicitOptional {
  [ImplicitOptionalFlag]: ImplicitOptionalFlag
}

const implicitOptional: ImplicitOptional = {
  [ImplicitOptionalFlag]: ImplicitOptionalFlag,
}

/** @internal */
export const makeImplicitOptional: <T>(
  val: T,
  clone: (val: T) => T,
) => ImplicitOptional & T = (val, clone) =>
  Object.assign(clone(val) as any, implicitOptional)

/** @internal */
export const makeImplicitOptionalType: <T>(val: T) => ImplicitOptional & T = unsafeCoerce

/** @internal */
export const hasImplicitOptional = (u: unknown): u is ImplicitOptional =>
  hasOwn(u as any, ImplicitOptionalFlag)

type KeyRemap = typeof KeyRemap
const KeyRemap = Symbol.for('schemata-ts/struct/KeyRemap')

/**
 * Determines types for whose key is remapped
 *
 * @since 2.0.0
 */
export interface RemappedKey<K extends string> {
  [KeyRemap]: K
}

/** @internal */
export const remapKey: <T, K extends string>(
  val: T,
  clone: (val: T) => T,
  key: K,
) => RemappedKey<K> & T = (val, clone, key) =>
  Object.assign(clone(val) as any, { [KeyRemap]: key })

/** @internal */
export const getKeyRemap = (val: unknown): O.Option<string> =>
  hasOwn(val as any, KeyRemap) ? O.some((val as any)[KeyRemap]) : O.none

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

/**
 * Used to remap a struct's keys using a provided type-level function and equivalent string mapper
 *
 * @since 1.4.0
 */
type MapKeysWith = <R extends KeyRemapLambda>(
  mapping: <S extends string>(s: S) => ApplyKeyRemap<KeyRemapLambda, S>,
) => <
  S extends SchemableLambda,
  Props extends Record<string, SchemableKind<S, any, any>>,
>(
  props: Props,
) => {
  [K in keyof Props]: Props[K] extends RemappedKey<infer Mapped> & infer Prop
    ? RemappedKey<ApplyKeyRemap<R, Mapped>> & Prop
    : RemappedKey<ApplyKeyRemap<R, K & string>> & Props[K]
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
export const mapKeysWith: MapKeysWith = mapping => (props: Record<string, any>) => {
  const remappedProps: any = {}
  for (const key in props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const prop = props[key]!
    remappedProps[key] = remapKey(
      prop,
      val => Object.assign({}, val),
      pipe(
        getKeyRemap(prop),
        O.getOrElse(() => key),
        mapping,
      ),
    )
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
 *   import * as S from 'schemata-ts/schemata'
 *   import * as s from 'schemata-ts/struct'
 *   import { getEncoder } from 'schemata-ts/Encoder'
 *
 *   const databasePerson = s.struct({
 *     first_name: S.String,
 *     last_name: S.String,
 *     age: S.Number,
 *     is_married: S.BooleanFromString,
 *   })
 *
 *   const DatabasePerson = S.StructM(s.camelCaseKeys(databasePerson))
 *
 *   // DatabasePerson will have the type:
 *   // Schema<
 *   //   { first_name: string, last_name: string, age: number, is_married: string },
 *   //   { firstName: string, lastName: string, age: number, isMarried: boolean }
 *   // >
 *
 *   const encoder = getEncoder(DatabasePerson)
 *
 *   assert.deepStrictEqual(
 *     encoder.encode({
 *       firstName: 'John',
 *       lastName: 'Doe',
 *       age: 42,
 *       isMarried: false,
 *     }),
 *     {
 *       first_name: 'John',
 *       last_name: 'Doe',
 *       age: 42,
 *       is_married: 'false',
 *     },
 *   )
 */
export const camelCaseKeys = mapKeysWith<CamelCaseLambda>(camelCase)

/**
 * Defines a reusable struct declaration for use with `Struct`
 *
 * @since 1.4.0
 * @category Constructors
 * @example
 *   import * as S from 'schemata-ts/schemata'
 *   import * as s from 'schemata-ts/struct'
 *   import { getEncoder } from 'schemata-ts/Encoder'
 *
 *   const someDomainType = s.struct({
 *     a: S.String,
 *     b: S.BooleanFromNumber,
 *   })
 *
 *   const SomeDomainTypeSchema = S.Struct(someDomainType)
 *
 *   // SomeDomainTypeSchema will have the type:
 *   // Schema<{ a: string, b: number }, { a: string, b: boolean }>
 *
 *   const encoder = getEncoder(SomeDomainTypeSchema)
 *
 *   assert.deepStrictEqual(
 *     encoder.encode({
 *       a: 'foo',
 *       b: false,
 *     }),
 *     {
 *       a: 'foo',
 *       b: 0,
 *     },
 *   )
 */
export const struct: <
  S extends SchemableLambda,
  Props extends Record<string, SchemableKind<S, any, any>>,
>(
  props: Props,
) => Props = identity

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

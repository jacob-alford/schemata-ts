/**
 * A meta definition for a struct for use with `StructM` schema
 *
 * @since 1.3.0
 */
import { unsafeCoerce } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { hasOwn } from 'schemata-ts/internal/util'

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

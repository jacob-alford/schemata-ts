/**
 * Type utils for WithStructM
 *
 * @since 1.3.0
 */
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'
import * as s from 'schemata-ts/struct'
/* eslint-disable @typescript-eslint/ban-types */

/** @since 1.3.0 */
export type RemapKey<KeyIn, Prop> = Prop extends s.RemappedKey<infer KeyOut>
  ? KeyOut
  : KeyIn

/** @since 2.0.0 */
export type InnerInput<S extends SchemableLambda, Prop> = Prop extends SchemableKind<
  S,
  infer I,
  any
>
  ? I
  : never

/** @since 2.0.0 */
export type InnerOutput<
  S extends SchemableLambda,
  Prop,
> = Prop extends s.ImplicitOptional & SchemableKind<S, any, infer O>
  ? O
  : Prop extends SchemableKind<S, any, infer O>
  ? O
  : never

/** @since 2.0.0 */
export type OptionalInputProps<
  S extends SchemableLambda,
  T extends Record<string, SchemableKind<S, any, any>>,
> = {
  [K in keyof T as T[K] extends s.ImplicitOptional ? K : never]?: InnerInput<S, T[K]>
}

/** @since 2.0.0 */
export type RequiredInputProps<
  S extends SchemableLambda,
  T extends Record<string, SchemableKind<S, any, any>>,
> = {
  [K in keyof T as T[K] extends s.ImplicitOptional ? never : K]: InnerInput<S, T[K]>
}

/** @since 2.0.0 */
export type OutputProps<
  S extends SchemableLambda,
  T extends Record<string, SchemableKind<S, any, any>>,
> = {
  [K in keyof T as T[K] extends s.RemappedKey<infer Remap> ? Remap : K]: InnerOutput<
    S,
    T[K]
  >
}

/** @since 2.0.0 */
export type RestInput<S extends SchemableLambda, RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends SchemableKind<S, infer I, any> ? I : never } | {}

/** @since 2.0.0 */
export type RestOutput<S extends SchemableLambda, RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends SchemableKind<S, any, infer O> ? O : never } | {}

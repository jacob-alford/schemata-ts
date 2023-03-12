/**
 * Type utils for WithStructM
 *
 * @since 1.3.0
 */
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'
import * as s from 'schemata-ts/struct'
/* eslint-disable @typescript-eslint/ban-types */

/** @since 1.3.0 */
export type RemapKey<KeyIn, Prop> = Prop extends { readonly _keyRemap: infer KeyOut }
  ? KeyOut extends s.KeyNotMapped
    ? KeyIn
    : KeyOut
  : never

/** @since 2.0.0 */
export type InnerInput<S extends SchemableLambda, Prop> = Prop extends {
  readonly _val: infer Val
}
  ? Val extends SchemableKind<S, infer I, any>
    ? I
    : never
  : never

/** @since 2.0.0 */
export type InnerOutput<S extends SchemableLambda, Prop> = Prop extends {
  readonly _val: infer Val
}
  ? Val extends s.ImplicitOptional & SchemableKind<S, any, infer O>
    ? O
    : Val extends SchemableKind<S, any, infer O>
    ? O
    : never
  : never

/** @since 2.0.0 */
export type OptionalInputProps<
  S extends SchemableLambda,
  T extends Record<string, s.Prop<S, SchemableKind<S, any, any>, any>>,
> = {
  [K in keyof T as T[K]['_val'] extends s.ImplicitOptional ? K : never]?: InnerInput<
    S,
    T[K]
  >
}

/** @since 2.0.0 */
export type RequiredInputProps<
  S extends SchemableLambda,
  T extends Record<string, s.Prop<S, SchemableKind<S, any, any>, any>>,
> = {
  [K in keyof T as T[K]['_val'] extends s.ImplicitOptional ? never : K]: InnerInput<
    S,
    T[K]
  >
}

/** @since 2.0.0 */
export type OutputProps<
  S extends SchemableLambda,
  T extends Record<string, s.Prop<S, SchemableKind<S, any, any>, any>>,
> = {
  [K in keyof T]: InnerOutput<S, T[K]>
}

/** @since 2.0.0 */
export type RestInput<S extends SchemableLambda, RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends SchemableKind<S, infer I, any> ? I : never } | {}

/** @since 2.0.0 */
export type RestOutput<S extends SchemableLambda, RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends SchemableKind<S, any, infer O> ? O : never } | {}

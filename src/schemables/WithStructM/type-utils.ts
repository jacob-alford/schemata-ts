/**
 * Type utils for WithStructM
 *
 * @since 1.3.0
 */
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { KeyNotMapped, OptionalKeyFlag, RequiredKeyFlag } from 'schemata-ts/struct'
/* eslint-disable @typescript-eslint/ban-types */

/** @since 1.3.0 */
export type OptionalProps<T> = {
  [K in keyof T]: T[K] extends { readonly _flag: OptionalKeyFlag } ? K : never
}[keyof T]

/** @since 1.3.0 */
export type RequiredProps<T> = {
  [K in keyof T]: T[K] extends { readonly _flag: RequiredKeyFlag } ? K : never
}[keyof T]

/** @since 1.3.0 */
export type RemapKey<KeyIn, Prop> = Prop extends { readonly _keyRemap: infer KeyOut }
  ? KeyOut extends KeyNotMapped
    ? KeyIn
    : KeyOut
  : never

/** @since 1.3.0 */
export type InnerValue1<S extends URIS, Prop> = Prop extends {
  readonly _val: infer Val
}
  ? Val extends Kind<S, infer A>
    ? A
    : never
  : never

/** @since 1.3.0 */
export type RestValue1<S extends URIS, RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends Kind<S, infer A> ? A : never } | {}

/** @since 1.3.0 */
export type InputHKT2<S, Prop> = Prop extends {
  readonly _val: infer Val
}
  ? Val extends HKT2<S, infer E, any>
    ? E
    : never
  : never

/** @since 1.3.0 */
export type OutputHKT2<S, Prop> = Prop extends {
  readonly _val: infer Val
}
  ? Val extends HKT2<S, any, infer A>
    ? A
    : never
  : never

/** @since 1.3.0 */
export type RestInputHKT2<S, RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends HKT2<S, infer E, any> ? E : never } | {}

/** @since 1.3.0 */
export type RestOutputHKT2<S, RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends HKT2<S, any, infer A> ? A : never } | {}

/** @since 1.3.0 */
export type Input2<S extends URIS2, Prop> = Prop extends {
  readonly _val: infer Val
}
  ? Val extends Kind2<S, infer E, any>
    ? E
    : never
  : never

/** @since 1.3.0 */
export type Output2<S extends URIS2, Prop> = Prop extends {
  readonly _val: infer Val
}
  ? Val extends Kind2<S, any, infer A>
    ? A
    : never
  : never

/** @since 1.3.0 */
export type RestInput2<S extends URIS2, RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends Kind2<S, infer E, any> ? E : never } | {}

/** @since 1.3.0 */
export type RestOutput2<S extends URIS2, RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends Kind2<S, any, infer A> ? A : never } | {}

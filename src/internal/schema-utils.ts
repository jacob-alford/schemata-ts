/* eslint-disable @typescript-eslint/ban-types */
import { type InputOf, type OutputOf, type Schema } from 'schemata-ts/Schema'
import type * as s from 'schemata-ts/struct'

/** @since 2.0.0 */
export type OptionalInputProps<T extends Record<string, Schema<any, any>>> = {
  [K in keyof T as T[K] extends s.ImplicitOptional
    ? K
    : never]?: T[K] extends s.ImplicitOptional & infer A ? InputOf<A> : never
}

/** @since 2.0.0 */
export type RequiredInputProps<T extends Record<string, Schema<any, any>>> = {
  [K in keyof T as T[K] extends s.ImplicitOptional ? never : K]: InputOf<T[K]>
}

/** @since 2.0.0 */
export type OutputProps<T extends Record<string, Schema<any, any>>> = {
  [K in keyof T]: T[K] extends s.ImplicitOptional & infer A ? OutputOf<A> : OutputOf<T[K]>
}

/** @since 2.0.0 */
export type PartialOutputProps<T extends Record<string, Schema<any, any>>> = {
  [K in keyof T]: T[K] extends s.ImplicitOptional & infer A
    ? OutputOf<A> | undefined
    : OutputOf<T[K]> | undefined
}

/** @since 2.0.0 */
export type RestInput<RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends Schema<infer I, any> ? I : never } | {}

/** @since 2.0.0 */
export type RestOutput<RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends Schema<any, infer O> ? O : never } | {}

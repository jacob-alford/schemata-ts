import { type Option } from 'schemata-ts/internal/option'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'
import type * as s from 'schemata-ts/internal/struct'
import {
  type InputOf,
  type OutputOf,
  type Schema,
  SchemaImplementation,
} from 'schemata-ts/Schema'
import { type Schemable } from 'schemata-ts/Schemable'

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

export type OptionOutputProps<T extends Record<string, Schema<any, any>>> = {
  [K in keyof T]: Option<NonNullable<OutputOf<T[K]>>>
}

/** @since 2.0.0 */
export type RestInput<RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends Schema<infer I, any> ? I : never }

/** @since 2.0.0 */
export type RestOutput<RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends Schema<any, infer O> ? O : never }

/** @internal */
export const make = <S extends Schema<any, any>['runSchema']>(
  f: S,
): S extends (...args: ReadonlyArray<any>) => {
  Input: (...args: ReadonlyArray<any>) => infer E
  Output: (...args: ReadonlyArray<any>) => infer A
}
  ? Schema<E, A>
  : never => SchemaImplementation.make(f)

/** @since 2.0.0 */
export type Interpreter<S extends SchemableLambda> = <I, O>(
  schema: Schema<I, O>,
) => SchemableKind<S, I, O>

/** @since 1.0.0 */
export const interpret: <S extends SchemableLambda>(S: Schemable<S>) => Interpreter<S> =
  S => schema =>
    schema.runSchema(S)

export { memoize } from 'schemata-ts/Schema'

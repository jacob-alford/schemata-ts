import { InputOf, OutputOf, Schema } from 'schemata-ts/Schema'
import * as s from 'schemata-ts/struct'

/** @internal */
export type OptionalInputProps<T extends Record<string, Schema<any, any>>> = {
  [K in keyof T as T[K] extends s.ImplicitOptional & infer S
    ? InputOf<S> extends NonNullable<InputOf<S>>
      ? never
      : K
    : never]?: T[K] extends s.ImplicitOptional & infer A ? InputOf<A> : never
}

/** @internal */
export type OptionalOutputProps<T extends Record<string, Schema<any, any>>> = {
  [K in keyof T as T[K] extends s.ImplicitOptional & infer S
    ? OutputOf<S> extends NonNullable<OutputOf<S>>
      ? never
      : K
    : never]?: T[K] extends s.ImplicitOptional & infer A ? OutputOf<A> : never
}

/** @internal */
export type RequiredInputProps<T extends Record<string, Schema<any, any>>> = {
  [K in keyof T as T[K] extends s.ImplicitOptional & infer S
    ? InputOf<S> extends NonNullable<OutputOf<S>>
      ? K
      : never
    : K]: T[K] extends s.ImplicitOptional & infer A
    ? InputOf<A>
    : T[K] extends Schema<infer I, any>
    ? I
    : never
}

/** @internal */
export type RequiredOutputProps<T extends Record<string, Schema<any, any>>> = {
  [K in keyof T as T[K] extends s.ImplicitOptional & infer S
    ? OutputOf<S> extends NonNullable<OutputOf<S>>
      ? K
      : never
    : K]: T[K] extends s.ImplicitOptional & infer A
    ? OutputOf<A>
    : T[K] extends Schema<any, infer O>
    ? O
    : never
}

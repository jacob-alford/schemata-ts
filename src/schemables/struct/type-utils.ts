import { type Const } from 'fp-ts/Const'
import { type Semigroup } from 'fp-ts/Semigroup'
import type * as G from 'schemata-ts/internal/guard'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'
import type * as s from 'schemata-ts/internal/struct'
/* eslint-disable @typescript-eslint/ban-types */

export type StructProp<S extends SchemableLambda> = {
  readonly schemable: SchemableKind<S, any, any>
  readonly guard: G.Guard<any>
  readonly information: Const<number, any>
  readonly semigroup: Semigroup<any>
}

export type RemapKey<KeyIn, Prop> = Prop extends s.RemappedKey<infer KeyOut>
  ? KeyOut
  : KeyIn

export type InnerInput<S extends SchemableLambda, Prop> = Prop extends SchemableKind<
  S,
  infer I,
  any
>
  ? I
  : never

export type InnerOutput<
  S extends SchemableLambda,
  Prop,
> = Prop extends s.ImplicitOptional & SchemableKind<S, any, infer O>
  ? O
  : Prop extends SchemableKind<S, any, infer O>
  ? O
  : never

export type OptionalInputProps<
  S extends SchemableLambda,
  T extends Record<string, StructProp<S>>,
> = {
  [K in keyof T as T[K]['schemable'] extends s.ImplicitOptional ? K : never]?: InnerInput<
    S,
    T[K]
  >
}

export type RequiredInputProps<
  S extends SchemableLambda,
  T extends Record<string, StructProp<S>>,
> = {
  [K in keyof T as T[K]['schemable'] extends s.ImplicitOptional ? never : K]: InnerInput<
    S,
    T[K]
  >
}

export type OutputProps<
  S extends SchemableLambda,
  T extends Record<string, StructProp<S>>,
> = {
  [K in keyof T as T[K]['schemable'] extends s.RemappedKey<infer Remap>
    ? Remap
    : K]: InnerOutput<S, T[K]>
}

export type RestInput<S extends SchemableLambda, RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends SchemableKind<S, infer I, any> ? I : never } | {}

export type RestOutput<S extends SchemableLambda, RestKind> = RestKind extends undefined
  ? unknown
  : { [key: string]: RestKind extends SchemableKind<S, any, infer O> ? O : never } | {}

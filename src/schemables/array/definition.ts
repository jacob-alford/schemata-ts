import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'

export type ArrayParams = {
  readonly minLength?: number
  readonly maxLength?: number
}

export interface WithArray<S extends SchemableLambda> {
  readonly array: (
    params?: ArrayParams,
  ) => <I, A>(
    target: SchemableKind<S, I, A>,
  ) => SchemableKind<S, ReadonlyArray<I>, ReadonlyArray<A>>
  readonly tuple: <T extends ReadonlyArray<SchemableKind<S, any, any>>>(
    ...targets: T
  ) => SchemableKind<
    S,
    { [K in keyof T]: T[K] extends SchemableKind<S, infer I, any> ? I : never },
    { readonly [K in keyof T]: T[K] extends SchemableKind<S, any, infer A> ? A : never }
  >
}

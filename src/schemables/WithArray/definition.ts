/** @since 1.0.0 */
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

export interface WithArray<S extends SchemableLambda> {
  readonly array: <I, A>(
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

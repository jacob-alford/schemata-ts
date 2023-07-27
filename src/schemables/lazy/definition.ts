import { type Lazy } from 'fp-ts/function'
import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'

export interface WithLazy<S extends SchemableLambda> {
  readonly lazy: <I, O>(
    name: string,
    innerRecursive: Lazy<SchemableKind<S, I, O>>,
  ) => SchemableKind<S, I, O>
}

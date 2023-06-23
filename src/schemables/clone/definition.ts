import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'

export interface WithClone<S extends SchemableLambda> {
  readonly clone: <I, O>(schema: SchemableKind<S, I, O>) => SchemableKind<S, I, O>
}

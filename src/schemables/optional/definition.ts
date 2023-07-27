import { type SchemableKind, type SchemableLambda } from 'schemata-ts/internal/schemable'
import { type ImplicitOptional } from 'schemata-ts/internal/struct'

export interface WithOptional<S extends SchemableLambda> {
  readonly optional: <I, A>(
    target: SchemableKind<S, I, A>,
    name: string,
  ) => ImplicitOptional & SchemableKind<S, I | undefined, A | undefined>
}

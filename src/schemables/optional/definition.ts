import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'
import { ImplicitOptional } from 'schemata-ts/struct'

export interface WithOptional<S extends SchemableLambda> {
  readonly optional: <I, A>(
    target: SchemableKind<S, I, A>,
  ) => ImplicitOptional & SchemableKind<S, I | undefined, A | undefined>
}

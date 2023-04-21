import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'
import { ImplicitOptional } from 'schemata-ts/struct'

export interface WithOptional<S extends SchemableLambda> {
  /**
   * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
   *
   * @since 1.0.0
   */
  readonly optional: <I, A>(
    target: SchemableKind<S, I, A>,
  ) => ImplicitOptional & SchemableKind<S, I | undefined, A | undefined>
}

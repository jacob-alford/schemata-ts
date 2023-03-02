/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOptional<S extends SchemableLambda> {
  /**
   * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
   *
   * @since 1.0.0
   */
  readonly optional: <O, A>(
    target: SchemableKind<S, O, A>,
  ) => SchemableKind<S, O | undefined, A | undefined>
}

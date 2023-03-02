/**
 * Represents an unknown value
 *
 * @since 1.3.0
 */
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

/**
 * @since 1.3.0
 * @category Model
 */
export interface WithUnknown<S extends SchemableLambda> {
  /**
   * Represents an unknown value
   *
   * @since 1.3.0
   */
  unknown: SchemableKind<S, unknown, unknown>
}

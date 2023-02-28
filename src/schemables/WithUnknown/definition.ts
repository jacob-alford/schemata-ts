/**
 * Represents an unknown value
 *
 * @since 1.3.0
 */
import { Kind, TypeLambda } from 'schemata-ts/HKT'

/**
 * @since 1.3.0
 * @category Model
 */
export interface WithUnknown<S extends TypeLambda> {
  /**
   * Represents an unknown value
   *
   * @since 1.3.0
   */
  unknown: Kind<S, unknown, unknown>
}

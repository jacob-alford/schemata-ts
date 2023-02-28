/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import { Kind, TypeLambda } from 'schemata-ts/HKT'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithOptional<S extends TypeLambda> {
  /**
   * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
   *
   * @since 1.0.0
   */
  readonly optional: <O, A>(
    target: Kind<S, O, A>,
  ) => Kind<S, O | undefined, A | undefined>
}

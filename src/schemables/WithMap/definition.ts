/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import * as Ord from 'fp-ts/Ord'
import { Kind, TypeLambda } from 'schemata-ts/HKT'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithMap<S extends TypeLambda> {
  /**
   * Represents a ReadonlyMap converted from an expected array of entries.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly mapFromEntries: <EK, EA, K extends EK, A extends EA>(
    ordEK: Ord.Ord<K>,
    sk: Kind<S, EK, K>,
    sa: Kind<S, EA, A>,
  ) => Kind<S, ReadonlyArray<readonly [K, A]>, ReadonlyMap<K, A>>
}

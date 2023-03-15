/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import * as Ord from 'fp-ts/Ord'
import { SchemableKind, SchemableLambda } from 'schemata-ts/HKT'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithMap<S extends SchemableLambda> {
  /**
   * Represents a ReadonlyMap converted from an expected array of entries.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly mapFromEntries: <EK, EA, K extends EK, A extends EA>(
    ordEK: Ord.Ord<K>,
    sk: SchemableKind<S, EK, K>,
    sa: SchemableKind<S, EA, A>,
  ) => SchemableKind<S, Array<readonly [EK, EA]>, ReadonlyMap<K, A>>
}

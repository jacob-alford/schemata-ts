/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import * as Ord from 'fp-ts/Ord'
import { HKT2, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithMapHKT2<S> {
  /**
   * Represents a ReadonlyMap converted from an expected array of entries.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly mapFromEntries: <EK, EA, K extends EK, A extends EA>(
    ordEK: Ord.Ord<K>,
    sk: HKT2<S, EK, K>,
    sa: HKT2<S, EA, A>,
  ) => HKT2<S, ReadonlyArray<readonly [K, A]>, ReadonlyMap<K, A>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithMap1<S extends URIS> {
  /**
   * Represents a ReadonlyMap converted from an expected array of entries.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly mapFromEntries: <K, A>(
    ordK: Ord.Ord<K>,
    sk: Kind<S, K>,
    sa: Kind<S, A>,
  ) => Kind<S, ReadonlyMap<K, A>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithMap2<S extends URIS2> {
  /**
   * Represents a ReadonlyMap converted from an expected array of entries.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly mapFromEntries: <EK, EA, K extends EK, A extends EA>(
    ordEK: Ord.Ord<K>,
    sk: Kind2<S, EK, K>,
    sa: Kind2<S, EA, A>,
  ) => Kind2<S, ReadonlyArray<readonly [EK, EA]>, ReadonlyMap<K, A>>
}

/**
 * @since 1.0.0
 * @category Model
 */
export interface WithMap2C<S extends URIS2, E> {
  /**
   * Represents a ReadonlyMap converted from an expected array of entries.
   *
   * @since 1.0.0
   * @category Model
   */
  readonly mapFromEntries: <K, A>(
    ordK: Ord.Ord<K>,
    sk: Kind2<S, E, K>,
    sa: Kind2<S, E, A>,
  ) => Kind2<S, E, ReadonlyMap<K, A>>
}

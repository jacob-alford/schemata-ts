/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import * as Ord from 'fp-ts/Ord'
import * as SC from 'schemata-ts/Schema'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema = <EK, EA, K extends EK, A extends EA>(
  ordK: Ord.Ord<K>,
  sK: SC.Schema<EK, K>,
  sA: SC.Schema<EA, A>,
): SC.Schema<ReadonlyArray<readonly [EK, EA]>, ReadonlyMap<K, A>> =>
  SC.make(S => S.mapFromEntries(ordK, sK(S), sA(S)))

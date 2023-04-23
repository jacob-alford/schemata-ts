/** @since 1.0.0 */
import * as Ord from 'fp-ts/Ord'
import * as SC from 'schemata-ts/Schema'

/**
 * A Schema for converting an array of key/value pairs to a map
 *
 * @since 1.0.0
 * @category Schema
 */
export const MapFromEntries = <EK, EA, K extends EK, A extends EA>(
  ordK: Ord.Ord<K>,
  sK: SC.Schema<EK, K>,
  sA: SC.Schema<EA, A>,
): SC.Schema<ReadonlyArray<readonly [EK, EA]>, ReadonlyMap<K, A>> =>
  SC.make(S => S.mapFromEntries(ordK, sK(S), sA(S)))

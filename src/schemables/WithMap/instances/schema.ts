/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import * as Ord from 'fp-ts/Ord'

import * as SC from '../../../SchemaExt'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema = <EK, EA, K extends EK, A extends EA>(
  ordK: Ord.Ord<K>,
  sK: SC.SchemaExt<EK, K>,
  sA: SC.SchemaExt<EA, A>,
): SC.SchemaExt<ReadonlyArray<readonly [EK, EA]>, ReadonlyMap<K, A>> =>
  SC.make(S => S.mapFromEntries(ordK, sK(S), sA(S)))

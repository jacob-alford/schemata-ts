/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import * as fc from 'fast-check'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RM from 'fp-ts/ReadonlyMap'
import * as Sg from 'fp-ts/Semigroup'

import * as Arb from '../../../base/ArbitraryBase'
import { WithMap1 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithMap1<Arb.URI> = {
  mapFromEntries: (ordK, arbK, arbA) =>
    fc.array(fc.tuple(arbK, arbA)).map(RM.fromFoldable(ordK, Sg.last(), RA.Foldable)),
}

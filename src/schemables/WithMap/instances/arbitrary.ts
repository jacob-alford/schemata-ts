/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import * as RA from 'fp-ts/ReadonlyArray'
import * as RM from 'fp-ts/ReadonlyMap'
import * as Sg from 'fp-ts/Semigroup'
import * as Arb from 'schemata-ts/Arbitrary'
import { WithMap1 } from 'schemata-ts/schemables/WithMap/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithMap1<Arb.URI> = {
  mapFromEntries: (ordK, arbK, arbA) => ({
    arbitrary: fc =>
      fc
        .array(fc.tuple(arbK.arbitrary(fc), arbA.arbitrary(fc)))
        .map(RM.fromFoldable(ordK, Sg.last(), RA.Foldable)),
  }),
}

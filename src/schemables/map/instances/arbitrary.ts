import * as RA from 'fp-ts/ReadonlyArray'
import * as RM from 'fp-ts/ReadonlyMap'
import * as Sg from 'fp-ts/Semigroup'
import * as Arb from 'schemata-ts/internal/arbitrary'
import { type WithMap } from 'schemata-ts/schemables/map/definition'

export const MapArbitrary: WithMap<Arb.SchemableLambda> = {
  mapFromEntries: (ordK, arbK, arbA) =>
    Arb.makeArbitrary(fc =>
      fc
        .array(fc.tuple(arbK.arbitrary(fc), arbA.arbitrary(fc)))
        .map(RM.fromFoldable(ordK, Sg.last(), RA.Foldable)),
    ),
}

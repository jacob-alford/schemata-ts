import * as fc from 'fast-check'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RM from 'fp-ts/ReadonlyMap'
import * as Sg from 'fp-ts/Semigroup'
import type * as Arb from 'schemata-ts/internal/arbitrary'
import { type WithMap } from 'schemata-ts/schemables/map/definition'

export const MapArbitrary: WithMap<Arb.SchemableLambda> = {
  mapFromEntries: (ordK, arbK, arbA) =>
    fc.array(fc.tuple(arbK, arbA)).map(RM.fromFoldable(ordK, Sg.last(), RA.Foldable)),
}

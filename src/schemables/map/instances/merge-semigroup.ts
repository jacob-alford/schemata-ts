import * as RM from 'fp-ts/ReadonlyMap'
import * as MSg from 'schemata-ts/internal/merge-semigroup'
import { type WithMap } from 'schemata-ts/schemables/map/definition'

export const MapMergeSemigroup: WithMap<MSg.SchemableLambda> = {
  mapFromEntries: (ordK, _, sa) =>
    MSg.constSemigroup(concrete => RM.getUnionSemigroup(ordK, sa.semigroup(concrete))),
}

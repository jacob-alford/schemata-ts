import * as RM from 'fp-ts/ReadonlyMap'
import * as Eq from 'schemata-ts/internal/eq'
import { WithMap } from 'schemata-ts/schemables/map/definition'

export const MapEq: WithMap<Eq.SchemableLambda> = {
  mapFromEntries: (_, sk, sa) => RM.getEq(sk, sa),
}

import { constant } from 'fp-ts/function'
import * as Inf from 'schemata-ts/internal/information'
import { WithMap } from 'schemata-ts/schemables/map/definition'

export const MapInformation: WithMap<Inf.SchemableLambda> = {
  mapFromEntries: constant(Inf.informationFromSampleSize(2 ** 24)),
}

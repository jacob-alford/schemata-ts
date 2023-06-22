import { type SchemableLambda, makeTypeString } from 'schemata-ts/internal/type-string'
import { type WithMap } from 'schemata-ts/schemables/map/definition'

export const MapTypeString: WithMap<SchemableLambda> = {
  mapFromEntries: (_, nameK, nameA) =>
    makeTypeString([`Array<[${nameK},${nameA}]>`, `Map<${nameK},${nameA}>`]),
}

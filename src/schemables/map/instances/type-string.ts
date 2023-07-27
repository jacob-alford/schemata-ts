import { type SchemableLambda, makeTypeString } from 'schemata-ts/internal/type-string'
import { type WithMap } from 'schemata-ts/schemables/map/definition'

export const MapTypeString: WithMap<SchemableLambda> = {
  mapFromEntries: (_, [nameKI, nameKO], [nameAI, nameAO]) =>
    makeTypeString([`Array<[${nameKI},${nameAI}]>`, `Map<${nameKO},${nameAO}>`]),
}

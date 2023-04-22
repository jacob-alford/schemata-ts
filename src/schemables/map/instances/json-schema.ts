import * as JS from 'schemata-ts/internal/json-schema'
import { WithMap } from 'schemata-ts/schemables/map/definition'

export const MapJsonSchema: WithMap<JS.SchemableLambda> = {
  mapFromEntries: (_, jsK, jsA) =>
    JS.make(new JS.JsonArray(new JS.JsonArray([jsK, jsA]))),
}

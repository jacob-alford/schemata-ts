import * as JS from 'schemata-ts/internal/json-schema'
import { WithJson } from 'schemata-ts/schemables/WithJson/definition'

export const WithJsonJsonSchema: WithJson<JS.SchemableLambda> = {
  json: JS.make(new JS.JsonEmpty()),
  jsonString: JS.make(
    new JS.JsonString(undefined, undefined, undefined, undefined, 'application/json'),
  ),
}

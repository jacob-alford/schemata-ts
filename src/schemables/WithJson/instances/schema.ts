import * as SC from 'schemata-ts/Schema'
import { WithJson } from 'schemata-ts/schemables/WithJson/definition'

export const WithJsonSchema: WithJson<Schem.SchemableLambda> = {
  json: SC.make(S => S.json),
  jsonString: SC.make(S => S.jsonString),
}

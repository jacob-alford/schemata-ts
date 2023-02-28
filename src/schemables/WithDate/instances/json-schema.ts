import * as JS from 'schemata-ts/internal/json-schema'
import { WithDate } from 'schemata-ts/schemables/WithDate/definition'

export const WithDateJsonSchema: WithDate<JS.SchemableLambda> = {
  date: JS.make(new JS.JsonEmpty()),
  dateFromString: JS.make(
    new JS.JsonString(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      'date',
    ),
  ),
}

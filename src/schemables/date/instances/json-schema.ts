import * as JS from 'schemata-ts/internal/json-schema'
import { type WithDate } from 'schemata-ts/schemables/date/definition'

export const DateJsonSchema: WithDate<JS.SchemableLambda> = {
  date: () => JS.make(new JS.JsonEmpty()),
  dateFromString: () =>
    JS.make(
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

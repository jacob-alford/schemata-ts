/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.2.0
 */
import * as JS from 'schemata-ts/internal/json-schema'
import { WithDate } from 'schemata-ts/schemables/WithDate/definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithDate<JS.SchemableLambda> = {
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

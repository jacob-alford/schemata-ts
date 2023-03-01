/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.2.0
 */
import * as JS from 'schemata-ts/JsonSchema'
import { WithDate2 } from 'schemata-ts/schemables/WithDate/definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithDate2<JS.URI> = {
  date: JS.emptySchema,
  dateFromString: JS.makeStringSchema({ format: 'date' }),
}

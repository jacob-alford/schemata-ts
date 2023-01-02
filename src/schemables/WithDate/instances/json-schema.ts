/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.2.0
 */
import * as JS from '../../../base/JsonSchemaBase'
import { WithDate2 } from '../definition'

const _ = undefined

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithDate2<JS.URI> = {
  date: JS.emptySchema,
  dateFromString: JS.makeStringSchema(_, _, _, _, _, _, 'date'),
}

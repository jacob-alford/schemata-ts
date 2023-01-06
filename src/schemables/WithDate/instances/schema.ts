/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import { URI as SchemaURI } from 'schemata-ts/base/SchemaBase'
import { WithDate2 } from 'schemata-ts/schemables/WithDate/definition'
import * as SC from 'schemata-ts/SchemaExt'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithDate2<SchemaURI> = {
  date: SC.make(S => S.date),
  dateFromString: SC.make(S => S.dateFromString),
}

/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import { URI as SchemaURI } from '../../../base/SchemaBase'
import * as SC from '../../../SchemaExt'
import { WithDate2 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithDate2<SchemaURI> = {
  date: SC.make(S => S.date),
  dateFromString: SC.make(S => S.dateFromString),
}

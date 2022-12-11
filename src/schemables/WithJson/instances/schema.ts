/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.0.2
 */
import { URI as SchemaURI } from '../../../base/SchemaBase'
import * as SC from '../../../SchemaExt'
import { WithJson2 } from '../definition'

/**
 * @since 1.0.2
 * @category Instances
 */
export const Schema: WithJson2<SchemaURI> = {
  json: SC.make(S => S.json),
  jsonString: SC.make(S => S.jsonString),
}

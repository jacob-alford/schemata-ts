/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import { URI as SchemaURI } from 'schemata-ts/base/SchemaBase'
import { WithJson2 } from 'schemata-ts/schemables/WithJson/definition'
import * as SC from 'schemata-ts/SchemaExt'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Schema: WithJson2<SchemaURI> = {
  json: SC.make(S => S.json),
  jsonString: SC.make(S => S.jsonString),
}

/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import { URI as SchemaURI } from 'schemata-ts/Schema'
import * as SC from 'schemata-ts/Schema'
import { WithJson } from 'schemata-ts/schemables/WithJson/definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Schema: WithJson<Schem.SchemableLambda> = {
  json: SC.make(S => S.json),
  jsonString: SC.make(S => S.jsonString),
}

/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.2.0
 */
import * as JS from '../../../base/JsonSchemaBase'
import { WithJson2 } from '../definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithJson2<JS.URI> = {
  json: JS.emptySchema,
  jsonString: JS.makeStringSchema({ contentMediaType: 'application/json' }),
}

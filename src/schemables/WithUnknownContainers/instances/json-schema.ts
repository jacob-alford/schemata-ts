/** @since 1.2.0 */
import * as JS from '../../../base/JsonSchemaBase'
import { WithUnknownContainers2 } from '../definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithUnknownContainers2<JS.URI> = {
  UnknownArray: JS.makeArraySchema()(JS.emptySchema),
  UnknownRecord: JS.makeRecordSchema(JS.emptySchema),
}

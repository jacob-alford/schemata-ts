/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import * as TD from 'schemata-ts/TaskDecoder'
import { WithJson2C } from 'schemata-ts/schemables/WithJson/definition'
import { Guard } from 'schemata-ts/schemables/WithJson/instances/guard'

/**
 * @since 1.1.0
 * @category Instances
 */
export const TaskDecoder: WithJson2C<TD.URI, unknown> = {
  json: TD.fromGuard(Guard.json, 'Json'),
  jsonString: TD.fromGuard(Guard.jsonString, 'JsonString'),
}

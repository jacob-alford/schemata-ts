/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import * as D from 'schemata-ts/Decoder'
import { WithJson2C } from 'schemata-ts/schemables/WithJson/definition'
import { Guard } from 'schemata-ts/schemables/WithJson/instances/guard'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Decoder: WithJson2C<D.URI, unknown> = {
  json: D.fromGuard(Guard.json, 'Json'),
  jsonString: D.fromGuard(Guard.jsonString, 'JsonString'),
}

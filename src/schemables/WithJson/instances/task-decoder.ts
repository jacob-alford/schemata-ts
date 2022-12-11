/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.0.2
 */
import * as TD from '../../../base/TaskDecoderBase'
import { WithJson2C } from '../definition'
import { Guard } from './guard'

/**
 * @since 1.0.2
 * @category Instances
 */
export const TaskDecoder: WithJson2C<TD.URI, unknown> = {
  json: TD.fromGuard(Guard.json, 'Json'),
  jsonString: TD.fromGuard(Guard.jsonString, 'JsonString'),
}

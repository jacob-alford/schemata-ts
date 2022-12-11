/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.0.2
 */
import * as D from '../../../base/DecoderBase'
import { WithJson2C } from '../definition'
import { Guard } from './guard'

/**
 * @since 1.0.2
 * @category Instances
 */
export const Decoder: WithJson2C<D.URI, unknown> = {
  json: D.fromGuard(Guard.json, 'Json'),
  jsonString: D.fromGuard(Guard.jsonString, 'JsonString'),
}

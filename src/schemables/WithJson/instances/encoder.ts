/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import * as Enc from '../../../base/EncoderBase'
import { WithJson2 } from '../definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Encoder: WithJson2<Enc.URI> = {
  json: Enc.id(),
  jsonString: Enc.id(),
}

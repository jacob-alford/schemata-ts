/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import * as Enc from '../../../base/EncoderBase'
import { WithOptional2 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithOptional2<Enc.URI> = {
  optional: ea => ({
    encode: a => (a === undefined ? undefined : ea.encode(a)),
  }),
}

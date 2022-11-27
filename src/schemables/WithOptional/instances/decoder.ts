/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import * as D from '../../../base/DecoderBase'
import { WithOptional2C } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithOptional2C<D.URI, unknown> = {
  optional: da => ({
    decode: u => (u === undefined ? D.success(u) : da.decode(u)),
  }),
}

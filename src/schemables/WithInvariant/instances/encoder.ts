/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import * as Enc from '../../../base/EncoderBase'
import { WithInvariant2 } from '../definition'
import { flow } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithInvariant2<Enc.URI> = {
  imap: () => (_, reverseGet) => encA => ({
    encode: flow(reverseGet, encA.encode),
  }),
}

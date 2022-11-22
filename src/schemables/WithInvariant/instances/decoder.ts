/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import * as D from '../../../base/DecoderBase'
import * as E from 'fp-ts/Either'
import { WithInvariant2C } from '../definition'
import { flow } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithInvariant2C<D.URI, unknown> = {
  imap: () => get => dA => ({
    decode: flow(dA.decode, E.map(get)),
  }),
}

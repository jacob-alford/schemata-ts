/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import * as TD from '../../../base/TaskDecoderBase'
import * as TE from 'fp-ts/TaskEither'
import { WithInvariant2C } from '../definition'
import { flow } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithInvariant2C<TD.URI, unknown> = {
  imap: () => get => tdA => ({
    decode: flow(tdA.decode, TE.map(get)),
  }),
}

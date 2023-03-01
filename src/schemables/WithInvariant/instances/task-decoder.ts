/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import { flow } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import * as TD from 'schemata-ts/TaskDecoder'
import { WithInvariant2C } from 'schemata-ts/schemables/WithInvariant/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithInvariant2C<TD.URI, unknown> = {
  imap: () => get => tdA => ({
    decode: flow(tdA.decode, TE.map(get)),
  }),
}

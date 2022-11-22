/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import { flow } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RM from 'fp-ts/ReadonlyMap'
import * as Sg from 'fp-ts/Semigroup'
import * as TE from 'fp-ts/TaskEither'
import * as TD from 'io-ts/TaskDecoder'

import { WithMap2C } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithMap2C<TD.URI, unknown> = {
  mapFromEntries: (ordK, sk, sa) => ({
    decode: flow(
      TD.array(TD.tuple(sk, sa)).decode,
      TE.map(RM.fromFoldable(ordK, Sg.last(), RA.Foldable)),
    ),
  }),
}

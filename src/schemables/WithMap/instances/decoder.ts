/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RM from 'fp-ts/ReadonlyMap'
import * as Sg from 'fp-ts/Semigroup'
import * as D from 'io-ts/Decoder'
import { WithMap2C } from 'schemata-ts/schemables/WithMap/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithMap2C<D.URI, unknown> = {
  mapFromEntries: (ordK, sk, sa) => ({
    decode: flow(
      D.array(D.tuple(sk, sa)).decode,
      E.map(RM.fromFoldable(ordK, Sg.last(), RA.Foldable)),
    ),
  }),
}

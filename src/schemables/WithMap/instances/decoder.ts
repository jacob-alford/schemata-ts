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
import * as D from 'schemata-ts/Decoder'
import { Decoder as WithArray } from 'schemata-ts/schemables/WithArray/instances/decoder'
import { WithMap } from 'schemata-ts/schemables/WithMap/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithMap<D.SchemableLambda> = {
  mapFromEntries: (ordK, sk, sa) => ({
    decode: flow(
      WithArray.array(WithArray.tuple(sk, sa)).decode,
      E.map(RM.fromFoldable(ordK, Sg.last(), RA.Foldable)),
    ),
  }),
}

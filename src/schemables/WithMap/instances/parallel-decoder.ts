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
import * as PD from 'schemata-ts/internal/ParallelDecoder'
import { ParallelDecoder as WithArray } from 'schemata-ts/schemables/WithArray/instances/parallel-decoder'
import { WithMap } from 'schemata-ts/schemables/WithMap/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithMap<PD.SchemableLambda> = {
  mapFromEntries: (ordK, sk, sa) => ({
    decode: flow(
      WithArray.array(WithArray.tuple(sk, sa)).decode,
      TE.map(RM.fromFoldable(ordK, Sg.last(), RA.Foldable)),
    ),
  }),
}

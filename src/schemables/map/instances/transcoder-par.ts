import { flow } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RM from 'fp-ts/ReadonlyMap'
import * as Sg from 'fp-ts/Semigroup'
import * as TE from 'fp-ts/TaskEither'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { ParallelDecoder as WithArray } from 'schemata-ts/schemables/array/instances/parallel-decoder'
import { WithMap } from 'schemata-ts/schemables/map/definition'

export const MapDecoder: WithMap<PD.SchemableLambda> = {
  mapFromEntries: (ordK, sk, sa) => ({
    decode: flow(
      WithArray.array(WithArray.tuple(sk, sa)).decode,
      TE.map(RM.fromFoldable(ordK, Sg.last(), RA.Foldable)),
    ),
  }),
}

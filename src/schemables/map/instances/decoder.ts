import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RM from 'fp-ts/ReadonlyMap'
import * as Sg from 'fp-ts/Semigroup'
import * as TC from 'schemata-ts/internal/Transcoder'
import { Decoder as WithArray } from 'schemata-ts/schemables/array/instances/decoder'
import { WithMap } from 'schemata-ts/schemables/map/definition'

export const MapTranscoder: WithMap<TC.SchemableLambda> = {
  mapFromEntries: (ordK, sk, sa) => ({
    decode: flow(
      WithArray.array(WithArray.tuple(sk, sa)).decode,
      E.map(RM.fromFoldable(ordK, Sg.last(), RA.Foldable)),
    ),
  }),
}

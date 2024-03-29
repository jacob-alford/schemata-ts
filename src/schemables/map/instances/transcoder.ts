import * as Ap from 'fp-ts/Apply'
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RM from 'fp-ts/ReadonlyMap'
import * as RTup from 'fp-ts/ReadonlyTuple'
import * as TC from 'schemata-ts/internal/transcoder'
import { ArrayTranscoder } from 'schemata-ts/schemables/array/instances/transcoder'
import { type WithMap } from 'schemata-ts/schemables/map/definition'

export const MapTranscoder: WithMap<TC.SchemableLambda> = {
  mapFromEntries: (ordK, sk, sa, expectedName, combineKeys) => ({
    decode: flow(
      ArrayTranscoder.array({ expectedName })(ArrayTranscoder.tuple('', sk, sa)).decode,
      E.map(RM.fromFoldable(ordK, combineKeys, RA.Foldable)),
    ),
    encode: flow(
      RM.toReadonlyArray(ordK),
      RA.traverse(TC.applicativeValidation)(
        flow(RTup.bimap(sa.encode, sk.encode), tup =>
          Ap.sequenceT(TC.applicativeValidation)(...tup),
        ),
      ),
    ),
  }),
}

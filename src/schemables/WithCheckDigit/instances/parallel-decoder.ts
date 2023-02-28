import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import { Branded } from 'schemata-ts/brand'
import * as TC from 'schemata-ts/internal/Transcoder'
import * as PD from 'schemata-ts/internal/parallel-decoder'
import {
  CheckDigitVerified,
  WithCheckDigit,
} from 'schemata-ts/schemables/WithCheckDigit/definition'
import {
  locationToIndex,
  replaceCharAt,
} from 'schemata-ts/schemables/WithCheckDigit/utils'

export const WithCheckDigitParallelDecoder: WithCheckDigit<PD.SchemableLambda> = {
  checkDigit: (algorithm, location) => dec => ({
    decode: s =>
      pipe(
        dec.decode(s),
        TE.chain(
          TE.fromPredicate(
            (s): s is Branded<string, CheckDigitVerified> =>
              s[locationToIndex(s, location)] === algorithm(s),
            s =>
              D.decodeErrors(
                D.typeMismatch(
                  s,
                  replaceCharAt(s, locationToIndex(s, location), algorithm(s)),
                ),
              ),
          ),
        ),
      ),
  }),
}

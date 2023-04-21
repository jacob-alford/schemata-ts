import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import { Branded } from 'schemata-ts/brand'
import * as TC from 'schemata-ts/internal/Transcoder'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import {
  CheckDigitVerified,
  WithCheckDigit,
} from 'schemata-ts/schemables/WithCheckDigit/definition'
import {
  locationToIndex,
  replaceCharAt,
} from 'schemata-ts/schemables/WithCheckDigit/utils'

export const WithCheckDigitTranscoderPar: WithCheckDigit<TCP.SchemableLambda> = {
  checkDigit: (algorithm, location) => tc => ({
    encode: tc.encode,
    decode: s =>
      pipe(
        tc.decode(s),
        TE.chain(
          TE.fromPredicate(
            (s): s is Branded<string, CheckDigitVerified> =>
              s[locationToIndex(s, location)] === algorithm(s),
            s =>
              TC.transcodeErrors(
                TC.typeMismatch(
                  s,
                  replaceCharAt(s, locationToIndex(s, location), algorithm(s)),
                ),
              ),
          ),
        ),
      ),
  }),
}

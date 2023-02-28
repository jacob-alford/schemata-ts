import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { Branded } from 'schemata-ts/brand'
import * as TC from 'schemata-ts/internal/Transcoder'
import {
  CheckDigitVerified,
  WithCheckDigit,
} from 'schemata-ts/schemables/WithCheckDigit/definition'
import {
  locationToIndex,
  replaceCharAt,
} from 'schemata-ts/schemables/WithCheckDigit/utils'

export const WithCheckDigitTranscoder: WithCheckDigit<TC.SchemableLambda> = {
  checkDigit: (algorithm, location) => dec => ({
    decode: s =>
      pipe(
        dec.decode(s),
        E.chain(
          E.fromPredicate(
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

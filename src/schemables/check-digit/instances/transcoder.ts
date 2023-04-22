import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { Branded } from 'schemata-ts/brand'
import * as TC from 'schemata-ts/internal/transcoder'
import {
  CheckDigitVerified,
  WithCheckDigit,
} from 'schemata-ts/schemables/check-digit/definition'
import { locationToIndex, replaceCharAt } from 'schemata-ts/schemables/check-digit/utils'

export const WithCheckDigitTranscoder: WithCheckDigit<TC.SchemableLambda> = {
  checkDigit: (algorithm, location) => dec => ({
    encode: dec.encode,
    decode: s =>
      pipe(
        dec.decode(s),
        E.chain(
          E.fromPredicate(
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

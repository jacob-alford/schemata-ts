import * as E from 'fp-ts/Either'
import { pipe, unsafeCoerce } from 'fp-ts/function'
import { type Branded } from 'schemata-ts/brand'
import * as TC from 'schemata-ts/internal/transcoder'
import {
  type CheckDigitVerified,
  type WithCheckDigit,
} from 'schemata-ts/schemables/check-digit/definition'
import { locationToIndex, replaceCharAt } from 'schemata-ts/schemables/check-digit/utils'

export const CheckDigitTranscoder: WithCheckDigit<TC.SchemableLambda> = {
  checkDigit: (algorithm, location) => dec => ({
    encode: unsafeCoerce(dec.encode),
    decode: s =>
      pipe(
        dec.decode(s),
        E.chain(
          E.fromPredicate(
            (s): s is Branded<CheckDigitVerified, CheckDigitVerified> =>
              s[locationToIndex(s, location)] === algorithm(s),
            s =>
              TC.transcodeErrors(
                TC.typeMismatch(
                  replaceCharAt(s, locationToIndex(s, location), algorithm(s)),
                  s,
                ),
              ),
          ),
        ),
      ),
  }),
}

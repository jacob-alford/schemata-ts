import { pipe, unsafeCoerce } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import { type Branded } from 'schemata-ts/brand'
import * as TC from 'schemata-ts/internal/transcoder'
import type * as TCP from 'schemata-ts/internal/transcoder-par'
import {
  type CheckDigitVerified,
  type WithCheckDigit,
} from 'schemata-ts/schemables/check-digit/definition'
import { locationToIndex, replaceCharAt } from 'schemata-ts/schemables/check-digit/utils'

export const CheckDigitTranscoderPar: WithCheckDigit<TCP.SchemableLambda> = {
  checkDigit: (algorithm, location) => tc => ({
    encode: unsafeCoerce(tc.encode),
    decode: s =>
      pipe(
        tc.decode(s),
        TE.chain(
          TE.fromPredicate(
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

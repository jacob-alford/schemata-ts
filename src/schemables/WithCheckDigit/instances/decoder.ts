/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { Branded } from 'io-ts'
import * as D from 'schemata-ts/base/DecoderBase'
import {
  CheckDigitVerified,
  WithCheckDigit2C,
} from 'schemata-ts/schemables/WithCheckDigit/definition'
import {
  locationToIndex,
  replaceCharAt,
} from 'schemata-ts/schemables/WithCheckDigit/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithCheckDigit2C<D.URI, unknown> = {
  checkDigit: (algorithm, location) => dec => ({
    decode: s =>
      pipe(
        dec.decode(s),
        E.chain(
          E.fromPredicate(
            (s): s is Branded<string, CheckDigitVerified> =>
              s[locationToIndex(s, location)] === algorithm(s),
            s => D.error(s, replaceCharAt(s, locationToIndex(s, location), algorithm(s))),
          ),
        ),
      ),
  }),
}

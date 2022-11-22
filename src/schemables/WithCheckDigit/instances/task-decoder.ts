/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import * as TD from '../../../base/TaskDecoderBase'
import * as TE from 'fp-ts/TaskEither'
import { CheckDigitVerified, WithCheckDigit2C } from '../definition'
import { locationToIndex, replaceCharAt } from '../utils'
import { pipe } from 'fp-ts/function'
import { Branded } from 'io-ts'

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithCheckDigit2C<TD.URI, unknown> = {
  checkDigit: (algorithm, location) => dec => ({
    decode: s =>
      pipe(
        dec.decode(s),
        TE.chain(
          TE.fromPredicate(
            (s): s is Branded<string, CheckDigitVerified> =>
              s[locationToIndex(s, location)] === algorithm(s),
            s =>
              TD.error(s, replaceCharAt(s, locationToIndex(s, location), algorithm(s))),
          ),
        ),
      ),
  }),
}

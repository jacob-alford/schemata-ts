/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import { Branded } from 'io-ts'

import * as TD from '../../../base/TaskDecoderBase'
import { CheckDigitVerified, WithCheckDigit2C } from '../definition'
import { locationToIndex, replaceCharAt } from '../utils'

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

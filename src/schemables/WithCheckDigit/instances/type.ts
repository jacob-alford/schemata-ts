/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import * as t from '../../../base/TypeBase'
import { CheckDigitVerified, WithCheckDigit1 } from '../definition'
import { locationToIndex } from '../utils'
import { pipe } from 'fp-ts/function'
import { Branded } from 'io-ts'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithCheckDigit1<t.URI> = {
  checkDigit: (algorithm, location) => type =>
    pipe(
      type,
      t.refine(
        (s): s is Branded<string, CheckDigitVerified> =>
          s[locationToIndex(s, location)] === algorithm(s),
        'checkDigit',
      ),
    ),
}

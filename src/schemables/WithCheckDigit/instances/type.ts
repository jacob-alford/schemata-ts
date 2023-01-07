/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { Branded } from 'io-ts'
import * as t from 'schemata-ts/base/TypeBase'
import {
  CheckDigitVerified,
  WithCheckDigit1,
} from 'schemata-ts/schemables/WithCheckDigit/definition'
import { locationToIndex } from 'schemata-ts/schemables/WithCheckDigit/utils'

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

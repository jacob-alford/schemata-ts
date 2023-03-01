/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import * as t from 'schemata-ts/Type'
import { Branded } from 'schemata-ts/brand'
import {
  CheckDigitVerified,
  WithCheckDigit1,
} from 'schemata-ts/schemables/WithCheckDigit/definition'
import { locationToIndex } from 'schemata-ts/schemables/WithCheckDigit/utils'

/**
 * @deprecated
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

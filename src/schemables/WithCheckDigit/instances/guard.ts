/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import * as G from 'schemata-ts/Guard'
import { Branded } from 'schemata-ts/brand'
import {
  CheckDigitVerified,
  WithCheckDigit1,
} from 'schemata-ts/schemables/WithCheckDigit/definition'
import { locationToIndex } from 'schemata-ts/schemables/WithCheckDigit/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithCheckDigit1<G.URI> = {
  checkDigit: (algorithm, location) => guard => ({
    is: (s): s is Branded<string, CheckDigitVerified> =>
      guard.is(s) && s[locationToIndex(s, location)] === algorithm(s),
  }),
}

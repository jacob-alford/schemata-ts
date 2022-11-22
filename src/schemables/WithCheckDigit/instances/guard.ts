/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import * as G from '../../../base/GuardBase'
import { CheckDigitVerified, WithCheckDigit1 } from '../definition'
import { locationToIndex } from '../utils'
import { Branded } from 'io-ts'

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

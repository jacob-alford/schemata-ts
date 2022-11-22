/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import * as Arb from '../../../base/ArbitraryBase'
import { CheckDigitVerified, WithCheckDigit1 } from '../definition'
import { locationToIndex, replaceCharAt } from '../utils'
import { Branded } from 'io-ts'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithCheckDigit1<Arb.URI> = {
  checkDigit: (algorithm, location) => arb =>
    arb.map(
      s =>
        replaceCharAt(s, locationToIndex(s, location), algorithm(s)) as Branded<
          string,
          CheckDigitVerified
        >,
    ),
}

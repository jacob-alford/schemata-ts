/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import { Branded } from 'io-ts'

import * as Arb from '../../../base/ArbitraryBase'
import { CheckDigitVerified, WithCheckDigit1 } from '../definition'
import { locationToIndex, replaceCharAt } from '../utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithCheckDigit1<Arb.URI> = {
  checkDigit: (algorithm, location) => arb => ({
    arbitrary: fc =>
      arb
        .arbitrary(fc)
        .map(
          s =>
            replaceCharAt(s, locationToIndex(s, location), algorithm(s)) as Branded<
              string,
              CheckDigitVerified
            >,
        ),
  }),
}

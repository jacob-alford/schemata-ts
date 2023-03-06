/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import * as Arb from 'schemata-ts/Arbitrary'
import { Branded } from 'schemata-ts/brand'
import {
  CheckDigitVerified,
  WithCheckDigit,
} from 'schemata-ts/schemables/WithCheckDigit/definition'
import {
  locationToIndex,
  replaceCharAt,
} from 'schemata-ts/schemables/WithCheckDigit/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithCheckDigit<Arb.SchemableLambda> = {
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

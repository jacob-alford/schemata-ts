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

export const WithCheckDigitArbitrary: WithCheckDigit<Arb.SchemableLambda> = {
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

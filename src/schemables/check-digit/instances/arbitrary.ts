import { Branded } from 'schemata-ts/brand'
import * as Arb from 'schemata-ts/internal/arbitrary'
import {
  CheckDigitVerified,
  WithCheckDigit,
} from 'schemata-ts/schemables/check-digit/definition'
import { locationToIndex, replaceCharAt } from 'schemata-ts/schemables/check-digit/utils'

export const CheckDigitArbitrary: WithCheckDigit<Arb.SchemableLambda> = {
  checkDigit: (algorithm, location) => arb =>
    Arb.makeArbitrary(fc =>
      arb
        .arbitrary(fc)
        .map(
          s =>
            replaceCharAt(s, locationToIndex(s, location), algorithm(s)) as Branded<
              string,
              CheckDigitVerified
            >,
        ),
    ),
}

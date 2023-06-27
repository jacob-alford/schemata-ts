import { type Branded } from 'schemata-ts/brand'
import type * as Arb from 'schemata-ts/internal/arbitrary'
import {
  type CheckDigitVerified,
  type WithCheckDigit,
} from 'schemata-ts/schemables/check-digit/definition'
import { locationToIndex, replaceCharAt } from 'schemata-ts/schemables/check-digit/utils'

export const CheckDigitArbitrary: WithCheckDigit<Arb.SchemableLambda> = {
  checkDigit: (algorithm, location) => arb =>
    arb.map(
      s =>
        replaceCharAt(s, locationToIndex(s, location), algorithm(s)) as Branded<
          CheckDigitVerified,
          CheckDigitVerified
        >,
    ),
}

import { type Branded } from 'schemata-ts/brand'
import type * as G from 'schemata-ts/internal/guard'
import {
  type CheckDigitVerified,
  type WithCheckDigit,
} from 'schemata-ts/schemables/check-digit/definition'
import { locationToIndex } from 'schemata-ts/schemables/check-digit/utils'

export const CheckDigitGuard: WithCheckDigit<G.SchemableLambda> = {
  checkDigit: (algorithm, location) => guard => ({
    is: (s): s is Branded<CheckDigitVerified, CheckDigitVerified> =>
      guard.is(s) && s[locationToIndex(s, location)] === algorithm(s),
  }),
}

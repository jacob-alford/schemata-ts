import { Branded } from 'schemata-ts/brand'
import * as G from 'schemata-ts/internal/guard'
import {
  CheckDigitVerified,
  WithCheckDigit,
} from 'schemata-ts/schemables/check-digit/definition'
import { locationToIndex } from 'schemata-ts/schemables/check-digit/utils'

export const WithCheckDigitGuard: WithCheckDigit<G.SchemableLambda> = {
  checkDigit: (algorithm, location) => guard => ({
    is: (s): s is Branded<string, CheckDigitVerified> =>
      guard.is(s) && s[locationToIndex(s, location)] === algorithm(s),
  }),
}

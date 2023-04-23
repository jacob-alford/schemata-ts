import { identity } from 'fp-ts/function'
import * as Eq from 'schemata-ts/internal/eq'
import { WithCheckDigit } from 'schemata-ts/schemables/check-digit/definition'

export const CheckDigitEq: WithCheckDigit<Eq.SchemableLambda> = {
  checkDigit: () => identity,
}

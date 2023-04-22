import { identity } from 'fp-ts/function'
import * as Eq_ from 'schemata-ts/Eq'
import { WithCheckDigit } from 'schemata-ts/schemables/check-digit/definition'

export const CheckDigitEq: WithCheckDigit<Eq_.SchemableLambda> = {
  checkDigit: () => identity,
}

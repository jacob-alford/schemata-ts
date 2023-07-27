import { identity } from 'fp-ts/function'
import type * as Eq from 'schemata-ts/internal/eq'
import { type WithCheckDigit } from 'schemata-ts/schemables/check-digit/definition'

export const CheckDigitEq: WithCheckDigit<Eq.SchemableLambda> = {
  checkDigit: () => identity,
}

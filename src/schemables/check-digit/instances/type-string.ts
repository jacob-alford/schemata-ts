import { type SchemableLambda, makeTypeString } from 'schemata-ts/internal/type-string'
import { type WithCheckDigit } from 'schemata-ts/schemables/check-digit/definition'

export const CheckDigitTypeString: WithCheckDigit<SchemableLambda> = {
  checkDigit:
    () =>
    ([i, o]) =>
      makeTypeString([`${i}*`, `${o}*`]),
}

import { identity } from 'fp-ts/function'
import * as JS from 'schemata-ts/internal/json-schema'
import { WithCheckDigit } from 'schemata-ts/schemables/check-digit/definition'

export const CheckDigitJsonSchema: WithCheckDigit<JS.SchemableLambda> = {
  checkDigit: () => identity,
}

import { identity, unsafeCoerce } from 'fp-ts/function'
import type * as JS from 'schemata-ts/internal/json-schema'
import { type WithCheckDigit } from 'schemata-ts/schemables/check-digit/definition'

export const CheckDigitJsonSchema: WithCheckDigit<JS.SchemableLambda> = {
  checkDigit: () => unsafeCoerce(identity),
}

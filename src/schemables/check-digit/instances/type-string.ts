import { constant, identity, unsafeCoerce } from 'fp-ts/function'
import { type SchemableLambda } from 'schemata-ts/internal/type-string'
import { type WithCheckDigit } from 'schemata-ts/schemables/check-digit/definition'

export const CheckDigitTypeString: WithCheckDigit<SchemableLambda> = {
  checkDigit: constant(unsafeCoerce(identity)),
}

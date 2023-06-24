import { identity, unsafeCoerce } from 'fp-ts/function'
import type * as MSg from 'schemata-ts/internal/merge-semigroup'
import { type WithCheckDigit } from 'schemata-ts/schemables/check-digit/definition'

export const CheckDigitMergeSemigroup: WithCheckDigit<MSg.SchemableLambda> = {
  checkDigit: () => unsafeCoerce(identity),
}

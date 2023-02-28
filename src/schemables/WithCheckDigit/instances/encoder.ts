import { identity } from 'fp-ts/function'
import * as Enc from 'schemata-ts/Encoder'
import { WithCheckDigit } from 'schemata-ts/schemables/WithCheckDigit/definition'

export const WithCheckDigitEncoder: WithCheckDigit<Enc.SchemableLambda> = {
  checkDigit: () => identity,
}

import { identity } from 'fp-ts/function'
import * as P from 'schemata-ts/Printer'
import { WithCheckDigit } from 'schemata-ts/schemables/WithCheckDigit/definition'

export const WithCheckDigitPrinter: WithCheckDigit<P.SchemableLambda> = {
  checkDigit: () => identity,
}

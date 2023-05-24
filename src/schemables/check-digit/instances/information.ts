import { Branded } from 'schemata-ts/brand'
import * as Inf from 'schemata-ts/internal/information'
import {
  CheckDigitVerified,
  WithCheckDigit,
} from 'schemata-ts/schemables/check-digit/definition'

export const CheckDigitInformation: WithCheckDigit<Inf.SchemableLambda> = {
  checkDigit:
    () =>
    (inf): Inf.Information<Branded<string, CheckDigitVerified>> =>
      Inf.makeInformation(inf / 2),
}

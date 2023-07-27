import { type Branded } from 'schemata-ts/brand'
import * as Inf from 'schemata-ts/internal/information'
import {
  type CheckDigitVerified,
  type WithCheckDigit,
} from 'schemata-ts/schemables/check-digit/definition'

export const CheckDigitInformation: WithCheckDigit<Inf.SchemableLambda> = {
  checkDigit:
    () =>
    (inf): Inf.Information<Branded<CheckDigitVerified, CheckDigitVerified>> =>
      Inf.makeInformation(inf / 2),
}

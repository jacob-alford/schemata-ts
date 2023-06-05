import { Branded } from 'schemata-ts/brand'
import * as SC from 'schemata-ts/Schema'
import { CheckDigitVerified } from 'schemata-ts/schemables/check-digit/definition'

/**
 * Verifies a character of a string against a check digit algorithm, useful for ISBNs,
 * credit cards, and others
 *
 * @since 1.0.0
 * @category Schema
 */
export const CheckDigit =
  (algorithm: (s: string) => string, location: number | ((s: string) => number)) =>
  <O>(schema: SC.Schema<O, string>): SC.Schema<O, Branded<string, CheckDigitVerified>> =>
    SC.make(s => s.checkDigit(algorithm, location)<O>(schema(s)))

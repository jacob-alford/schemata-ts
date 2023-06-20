import { type Schema, make } from 'schemata-ts/Schema'
import { type CheckDigitVerified } from 'schemata-ts/schemables/check-digit/definition'

/**
 * Verifies a character of a string against a check digit algorithm, useful for ISBNs,
 * credit cards, and others
 *
 * @since 1.0.0
 * @category Schema
 */
export const CheckDigit =
  (algorithm: (s: string) => string, location: number | ((s: string) => number)) =>
  (schema: Schema<string, string>): Schema<CheckDigitVerified> =>
    make(s => s.checkDigit(algorithm, location)(schema.runSchema(s)))

/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.1.0
 */
import { identity } from 'fp-ts/function'
import * as P from 'schemata-ts/base/PrinterBase'
import { WithCheckDigit2 } from 'schemata-ts/schemables/WithCheckDigit/definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithCheckDigit2<P.URI> = {
  checkDigit: () => identity,
}

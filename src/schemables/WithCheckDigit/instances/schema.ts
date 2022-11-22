/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import { Branded } from 'io-ts'

import * as SC from '../../../SchemaExt'
import { CheckDigitVerified } from '../definition'

/**
 * @since 1.0.0
 * @category Combinators
 */
export const Schema =
  (algorithm: (s: string) => string, location: number | ((s: string) => number)) =>
  <O>(
    schema: SC.SchemaExt<O, string>,
  ): SC.SchemaExt<O, Branded<string, CheckDigitVerified>> =>
    SC.make(s => s.checkDigit(algorithm, location)<O>(schema(s)))

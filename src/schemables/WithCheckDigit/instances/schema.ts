import { Branded } from 'schemata-ts/brand'
import * as SC from 'schemata-ts/Schema'
import { CheckDigitVerified } from 'schemata-ts/schemables/WithCheckDigit/definition'

export const Schema =
  (algorithm: (s: string) => string, location: number | ((s: string) => number)) =>
  <O>(schema: SC.Schema<O, string>): SC.Schema<O, Branded<string, CheckDigitVerified>> =>
    SC.make(s => s.checkDigit(algorithm, location)<O>(schema(s)))

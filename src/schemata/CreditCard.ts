/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
import { luhn } from 'schemata-ts/internal/algorithms'
import { type Schema } from 'schemata-ts/Schema'
import { type CheckDigitVerified } from 'schemata-ts/schemables/check-digit/definition'
import { Brand } from 'schemata-ts/schemata/Brand'
import { CheckDigit } from 'schemata-ts/schemata/CheckDigit'
import { Pattern } from 'schemata-ts/schemata/Pattern'

interface CreditCardBrand {
  readonly CreditCard: unique symbol
}

/**
 * @since 1.0.0
 * @category Model
 */
export type CreditCard = Branded<CheckDigitVerified, CreditCardBrand>

/**
 * Represents a credit card number; currently this should accept Visa, Mastercard,
 * American Express, Diners Club, Discover, JCB, Rupay, and UnionPay.
 *
 * @since 1.0.0
 * @category String
 */
export const CreditCard: Schema<CreditCard> = pipe(
  Pattern(k.patterns.creditCard, 'CreditCard'),
  CheckDigit(
    ccn => luhn(ccn.substring(0, ccn.length - 1)).toString(10),
    ccn => ccn.length - 1,
  ),
  Brand<CreditCardBrand>(),
)

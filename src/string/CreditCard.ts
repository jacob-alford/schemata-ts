/**
 * Represents (some) valid credit card numbers.
 *
 * At the moment, this mostly handles Visa, Mastercard, American Express, Diners Club,
 * Discover, and JCB.
 *
 * @since 0.0.3
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Enc from 'io-ts/Encoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as Str from 'fp-ts/string'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import { pipe } from 'fp-ts/function'
import * as fc from 'fast-check'

import * as Arb from '../internal/ArbitraryBase'
import { digits } from '../internal/util'
import { luhn } from '../internal/algorithms'

/**
 * @since 0.0.3
 * @internal
 */
interface CreditCardBrand {
  readonly CreditCard: unique symbol
}

/**
 * Represents (some) valid credit card numbers.
 *
 * At the moment, this mostly handles Visa, Mastercard, American Express, Diners Club,
 * Discover, and JCB.
 *
 * @since 0.0.3
 * @category Model
 */
export type CreditCard = string & CreditCardBrand

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, CreditCard>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, CreditCard>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, CreditCard>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, CreditCard>

const cc = new RegExp(
  [
    // visa
    // source: https://en.wikipedia.org/w/index.php?title=Payment_card_number&oldid=1110892430
    // afaict the 13-digit variant has not been a thing for years, but maybe there
    // are still some valid cards floating around?
    /(^4(\d{12}|\d{15})$)/,

    // mastercard
    // source: https://web.archive.org/web/20180514224309/https://www.mastercard.us/content/dam/mccom/global/documents/mastercard-rules.pdf
    /(^(5[1-5]\d{4}|222[1-9]\d{2}|22[3-9]\d{3}|2[3-6]\d{4}|27[01]\d{3}|2720\d{2})\d{10}$)/,

    // american express
    // source: https://web.archive.org/web/20210504163517/https://www.americanexpress.com/content/dam/amex/hk/en/staticassets/merchant/pdf/support-and-services/useful-information-and-downloads/GuidetoCheckingCardFaces.pdf
    /(^3[47]\d{13}$)/,

    // diners club
    // US/Canada DCI cards will match as Mastercard (source: https://web.archive.org/web/20081204135437/http://www.mastercard.com/in/merchant/en/solutions_resources/dinersclub.html)
    // Others match regex below (source: https://web.archive.org/web/20170822221741/https://www.discovernetwork.com/downloads/IPP_VAR_Compliance.pdf)
    /(^(3(0([0-5]\d{5}|95\d{4})|[89]\d{6})\d{8,11}|36\d{6}\d{6,11})$)/,

    // discover
    // source: https://web.archive.org/web/20170822221741/https://www.discovernetwork.com/downloads/IPP_VAR_Compliance.pdf
    /(^(6011(0[5-9]\d{2}|[2-4]\d{3}|74\d{2}|7[7-9]\d{2}|8[6-9]\d{2}|9\d{3})|64[4-9]\d{5}|650[0-5]\d{4}|65060[1-9]\d{2}|65061[1-9]\d{2}|6506[2-9]\d{3}|650[7-9]\d{4}|65[1-9]\d{5})\d{8,11}$)/,

    // jcb
    /(^(352[89]\d{4}|35[3-8]\d{5})\d{8,11}$)/,

    // Rupay
    // some are JCB co-branded so will match as JCB above
    // for the rest, best source I could find is just wikipedia:
    // https://en.wikipedia.org/w/index.php?title=Payment_card_number&oldid=1110892430
    /(^((60|65|81|82)\d{14}|508\d{14})$)/,

    // unionpay
    /(^62(2(12[6-9]\d{2}|1[3-9]\d{3}|[2-8]\d|9[01]\d{3}|92[0-5]\d{2})|[4-6]\d{5}|8[2-8]\d{4})\d{8,11}$)/,
  ]
    .map(re => re.source)
    .join('|')
)

/**
 * @since 0.0.3
 * @category Refinements
 */
export const isCreditCard = (s: string): s is CreditCard => {
  const clean = s.replace(/[^0-9]/g, '')
  return cc.test(clean) && luhn(clean.slice(0, -1)) === parseInt(clean.slice(-1))
}

/**
 * @since 0.0.3
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isCreditCard, 'CreditCard')
)

/**
 * @since 0.0.3
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = Enc.id()

/**
 * @since 0.0.3
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = Str.Eq

/**
 * @since 0.0.3
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = pipe(G.string, G.refine(isCreditCard))

/**
 * @since 0.0.3
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isCreditCard, 'CreditCard')
)

/**
 * @since 0.0.3
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.string,
  t.refine(isCreditCard, 'CreditCard')
)

/**
 * @since 0.0.3
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = fc
  .oneof(
    // visa
    digits([11, 14]).map(acct => `4${acct}`),
    // mastercard
    fc.oneof(
      fc
        .integer({ min: 2221, max: 2720 })
        .chain(iin => digits([11]).map(acct => `${iin}${acct}`)),
      fc
        .integer({ min: 51, max: 55 })
        .chain(iin => digits([13]).map(acct => `${iin}${acct}`))
    ),
    // amex
    digits([12]).chain(acct => fc.constantFrom('34', '37').map(iin => `${iin}${acct}`)),
    // diners club
    digits([11]).map(acct => `36${acct}`),
    // discover
    fc.oneof(
      digits([11]).map(acct => `6011${acct}`),
      digits([13]).map(acct => `65${acct}`)
    ),
    // jcb
    digits([11]).chain(acct =>
      fc.integer({ min: 3528, max: 3589 }).map(iin => `${iin}${acct}`)
    )
  )
  .map(num => `${num}${luhn(num.replace(/[^0-9]/g, ''))}`) as Arb.Arbitrary<CreditCard>

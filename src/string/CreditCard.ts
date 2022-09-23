/**
 * TODO: Add module comment
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
import { flow, pipe } from 'fp-ts/function'
import * as fc from 'fast-check'
import * as RA from 'fp-ts/ReadonlyArray'

import * as Arb from '../internal/ArbitraryBase'
import { MonoidSum } from 'fp-ts/lib/number'
import { digits } from '../internal/util'

/**
 * @since 0.0.3
 * @category Internal
 */
interface CreditCardBrand {
  readonly CreditCard: unique symbol
}

/**
 * TODO: Add module comment
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

const cc =
  /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/

/** This calculates the Luhn checksum for a given string of digits. */
const luhn: (cc: string) => number = flow(
  Str.split(''),
  RA.reverse,
  RA.map(d => parseInt(d)),
  RA.foldMapWithIndex(MonoidSum)((i, d) =>
    i % 2 === 1
      ? // numbers of odd rank stay the same
        d
      : // numbers of even rank get doubled, then their digits are summed
      d * 2 >= 10
      ? 1 + (d * 2 - 10)
      : d * 2
  ),
  sum => (sum % 10) % 10,
  checksum => (checksum === 0 ? 0 : 10 - checksum)
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

/**
 * Represents strings that conform to the ISO 8601 standard.
 *
 * @since 0.0.1
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Enc from 'io-ts/Encoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as O from 'fp-ts/Option'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import { flow, pipe, unsafeCoerce } from 'fp-ts/function'
import * as fc from 'fast-check'

import { SafeDate, Decoder as decodeSafeDate } from '../date/safeDate'
import * as Arb from '../internal/ArbitraryBase'

/**
 * @since 0.0.1
 * @internal
 */
interface ISODateBrand {
  readonly ISODate: unique symbol
}

/**
 * See: https://www.myintervals.com/blog/2009/05/20/iso-8601-date-validation-that-doesnt-suck/
 *
 * @since 0.0.1
 * @internal
 */
const iso8601Regex =
  /^((\d{4}|[+-]?\d{6})(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\4([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\18[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/

/**
 * Represents strings that conform to the ISO 8601 standard.
 *
 * @since 0.0.1
 * @category Model
 */
export type ISODateString = string & ISODateBrand

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, ISODateString>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, ISODateString>

/**
 * @since 0.0.3
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, ISODateString>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, ISODateString>

/**
 * @since 0.0.1
 * @category Constructors
 */
export const fromSafeDate: (d: SafeDate) => ISODateString = d =>
  unsafeCoerce(d.toISOString())

/**
 * @since 0.0.1
 * @category Constructors
 */
export const fromDate: (d: Date) => O.Option<ISODateString> = flow(
  decodeSafeDate.decode,
  O.fromEither,
  O.map(fromSafeDate)
)

/**
 * @since 0.0.1
 * @category Refinements
 */
export const isISODate = (s: string): s is ISODateString =>
  typeof s === 'string' && !Number.isNaN(new Date(s).getTime()) && iso8601Regex.test(s)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = pipe(
  D.string,
  D.refine(isISODate, 'ISODate')
)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = {
  equals: (x, y) => new Date(x).getTime() === new Date(y).getTime(),
}

/**
 * @since 0.0.1
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = pipe(G.string, G.refine(isISODate))

/**
 * @since 0.0.1
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = pipe(
  TD.string,
  TD.refine(isISODate, 'ISODate')
)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = pipe(
  t.string,
  t.refine(isISODate, 'ISODate')
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
export const Arbitrary: SchemableParams1<Arb.URI> = fc
  .date()
  .map(d => d.toISOString()) as Arb.Arbitrary<ISODateString>

/**
 * @since 0.0.1
 * @category Destructors
 */
export const toSafeDate: (iso: ISODateString) => SafeDate = iso =>
  unsafeCoerce(new Date(iso))

/**
 * Represents a conversion from a valid dateString according to
 * [ECMA262](https://tc39.es/ecma262/#sec-date-time-string-format) which is a particular
 * subset of ISO8601 parsable with `Date.parse()`.
 *
 * @since 1.0.0
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Enc from 'io-ts/Encoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import * as t_ from 'io-ts'
import { identity } from 'fp-ts/function'
import * as date from './date'
import * as Arb from '../internal/ArbitraryBase'
import * as SC from '../SchemaExt'
import { URI as SchemaURI } from '../internal/SchemaBase'

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, string, Date>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, Date>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, string, Date>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, Date>

/**
 * @since 1.0.0
 * @category Refinements
 */
export const isISODate = (s: unknown): s is string =>
  typeof s === 'string' && !Number.isNaN(new Date(s).getTime())

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = {
  decode: s =>
    isISODate(s) ? D.success(new Date(s)) : D.failure(s, 'dateFromIsoString'),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = date.Eq

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = date.Guard

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = {
  decode: s =>
    isISODate(s) ? TD.success(new Date(s)) : TD.failure(s, 'dateFromIsoString'),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = new t_.Type<Date, unknown, unknown>(
  'SafeDate',
  date.isSafeDate,
  (u, c) => (isISODate(u) ? t_.success(new Date(u)) : t_.failure(u, c)),
  identity,
)

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = {
  encode: d => d.toISOString(),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = date.Arbitrary

/**
 * Represents a conversion from a valid dateString according to
 * [ECMA262](https://tc39.es/ecma262/#sec-date-time-string-format) which is a particular
 * subset of ISO8601 parsable with `Date.parse()`.
 *
 * @since 1.0.0
 * @category Instances
 */
export const Schema: SchemableParams2<SchemaURI> = SC.make(S => S.dateFromIsoString)

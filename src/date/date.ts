/**
 * Represents valid Date objects
 *
 * @since 1.0.0
 */
import { Kind, Kind2, URIS, URIS2, HKT2 } from 'fp-ts/HKT'
import * as Enc from 'io-ts/Encoder'
import * as D from 'io-ts/Decoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import * as t_ from 'io-ts'
import { identity } from 'fp-ts/function'
import * as fc from 'fast-check'
import * as SC from '../SchemaExt'
import { URI as SchemaURI } from '../internal/SchemaBase'
import * as Arb from '../internal/ArbitraryBase'

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams<S> = HKT2<S, Date, Date>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, Date>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2<S extends URIS2> = Kind2<S, Date, Date>

/**
 * @since 1.0.0
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, Date>

/**
 * @since 1.0.0
 * @category Refinements
 */
export function isSafeDate(d: unknown): d is Date {
  return d instanceof Date && !Number.isNaN(d.getTime())
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = {
  is: isSafeDate,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = D.fromGuard(Guard, 'SafeDate')

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = {
  equals: (x, y) => x.getTime() === y.getTime(),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = TD.fromDecoder(Decoder)

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = new t_.Type<Date, unknown, unknown>(
  'SafeDate',
  isSafeDate,
  (u, c) => (isSafeDate(u) ? t_.success(u) : t_.failure(u, c)),
  identity
)

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: SchemableParams2<Enc.URI> = Enc.id()

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: SchemableParams1<Arb.URI> = fc.date().filter(isSafeDate)

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: SchemableParams2<SchemaURI> = SC.make(S => S.date)

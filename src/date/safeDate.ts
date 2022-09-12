/**
 * Represents Date objects which are not invalid dates
 *
 * @since 0.0.1
 */
import { Kind, Kind2, URIS, URIS2, HKT } from 'fp-ts/HKT'
import * as D from 'io-ts/Decoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import * as t_ from 'io-ts'
import { identity } from 'fp-ts/function'

/**
 * @since 0.0.1
 * @category Internal
 */
interface SafeDateBrand {
  readonly SafeDate: unique symbol
}

/**
 * @since 0.0.1
 * @category Model
 */
export type SafeDate = Date & SafeDateBrand

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams<S> = HKT<S, SafeDate>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams1<S extends URIS> = Kind<S, SafeDate>

/**
 * @since 0.0.1
 * @category Model
 */
export type SchemableParams2C<S extends URIS2> = Kind2<S, unknown, SafeDate>

/**
 * @since 0.0.1
 * @category Refinements
 */
export function isSafeDate(d: unknown): d is SafeDate {
  return d instanceof Date && !Number.isNaN(d.getTime())
}

/**
 * @since 0.0.1
 * @category Instances
 */
export const Guard: SchemableParams1<G.URI> = {
  is: isSafeDate,
}

/**
 * @since 0.0.1
 * @category Instances
 */
export const Decoder: SchemableParams2C<D.URI> = D.fromGuard(Guard, 'SafeDate')

/**
 * @since 0.0.1
 * @category Instances
 */
export const Eq: SchemableParams1<Eq_.URI> = {
  equals: (x, y) => x.getTime() === y.getTime(),
}

/**
 * @since 0.0.1
 * @category Instances
 */
export const TaskDecoder: SchemableParams2C<TD.URI> = TD.fromDecoder(Decoder)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Type: SchemableParams1<t.URI> = new t_.Type<SafeDate, unknown, unknown>(
  'SafeDate',
  isSafeDate,
  (u, c) => (isSafeDate(u) ? t_.success(u) : t_.failure(u, c)),
  identity
)

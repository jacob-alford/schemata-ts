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
export type WithDateHKT2<S> = {
  date: HKT2<S, Date, Date>
  dateFromIsoString: HKT2<S, string, Date>
}

/**
 * @since 1.0.0
 * @category Model
 */
export type WithDate1<S extends URIS> = {
  date: Kind<S, Date>
  dateFromIsoString: Kind<S, Date>
}

/**
 * @since 1.0.0
 * @category Model
 */
export type WithDate2<S extends URIS2> = {
  date: Kind2<S, Date, Date>
  dateFromIsoString: Kind2<S, string, Date>
}

/**
 * @since 1.0.0
 * @category Model
 */
export type WithDate2C<S extends URIS2, E> = {
  date: Kind2<S, E, Date>
  dateFromIsoString: Kind2<S, E, Date>
}

/**
 * @since 1.0.0
 * @category Refinements
 */
export function isSafeDate(d: unknown): d is Date {
  return d instanceof Date && !Number.isNaN(d.getTime())
}

/**
 * @since 1.0.0
 * @category Refinements
 */
export const isISODateString = (s: unknown): s is string =>
  typeof s === 'string' && !Number.isNaN(new Date(s).getTime())

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithDate1<G.URI> = {
  date: {
    is: isSafeDate,
  },
  dateFromIsoString: {
    is: isSafeDate,
  },
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithDate2C<D.URI, unknown> = {
  date: D.fromGuard(Guard.date, 'Date.date'),
  dateFromIsoString: {
    decode: s =>
      isISODateString(s)
        ? D.success(new Date(s))
        : D.failure(s, 'Date.dateFromIsoString'),
  },
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithDate1<Eq_.URI> = {
  date: {
    equals: (x, y) => x.getTime() === y.getTime(),
  },
  dateFromIsoString: {
    equals: (x, y) => x.getTime() === y.getTime(),
  },
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithDate2C<TD.URI, unknown> = {
  date: TD.fromDecoder(Decoder.date),
  dateFromIsoString: TD.fromDecoder(Decoder.dateFromIsoString),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithDate1<t.URI> = {
  date: new t_.Type<Date, unknown, unknown>(
    'SafeDate',
    isSafeDate,
    (u, c) => (isSafeDate(u) ? t_.success(u) : t_.failure(u, c)),
    identity,
  ),
  dateFromIsoString: new t_.Type<Date, unknown, unknown>(
    'SafeDate',
    isSafeDate,
    (u, c) => (isISODateString(u) ? t_.success(new Date(u)) : t_.failure(u, c)),
    identity,
  ),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithDate2<Enc.URI> = {
  date: Enc.id(),
  dateFromIsoString: { encode: d => d.toISOString() },
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithDate1<Arb.URI> = {
  date: fc.date().filter(isSafeDate),
  dateFromIsoString: fc.date().filter(isSafeDate),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithDate2<SchemaURI> = {
  date: SC.make(S => S.date),
  dateFromIsoString: SC.make(S => S.dateFromIsoString),
}

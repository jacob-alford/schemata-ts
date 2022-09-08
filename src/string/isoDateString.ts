/**
 * Represents strings that conform to the ISO 8601 standard
 *
 * @since 0.0.1
 */
import * as D from 'io-ts/Decoder'
import * as Eq_ from 'fp-ts/Eq'
import * as G from 'io-ts/Guard'
import * as O from 'fp-ts/Option'
import * as TD from 'io-ts/TaskDecoder'
import * as t from 'io-ts/Type'
import { pipe } from 'fp-ts/function'

/**
 * @since 0.0.1
 * @category Internal
 */
interface ISODateBrand {
  readonly ISODate: unique symbol
}

/**
 * See: https://www.myintervals.com/blog/2009/05/20/iso-8601-date-validation-that-doesnt-suck/
 *
 * @since 0.0.1
 * @category Internal
 */
const iso8601Regex =
  /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/

/**
 * @since 0.0.1
 * @category Model
 */
export type ISODate = string & ISODateBrand

/**
 * @since 0.0.1
 * @category Constructors
 */
export const fromDate: (d: Date) => O.Option<ISODate> = d =>
  pipe(d.toISOString(), O.fromPredicate(isISODate))

/**
 * @since 0.0.1
 * @category Refinements
 */
export function isISODate(s: string): s is ISODate
export function isISODate(s: unknown): s is ISODate {
  return (
    typeof s === 'string' && !Number.isNaN(new Date(s).getTime()) && iso8601Regex.test(s)
  )
}

/**
 * @since 0.0.1
 * @category Instances
 */
export const Decoder: D.Decoder<unknown, ISODate> = pipe(
  D.string,
  D.refine(isISODate, 'ISODate')
)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Eq: Eq_.Eq<ISODate> = {
  equals: (x, y) => new Date(x).getTime() === new Date(y).getTime(),
}

/**
 * @since 0.0.1
 * @category Instances
 */
export const Guard: G.Guard<unknown, ISODate> = pipe(G.string, G.refine(isISODate))

/**
 * @since 0.0.1
 * @category Instances
 */
export const TaskDecoder: TD.TaskDecoder<unknown, ISODate> = pipe(
  TD.string,
  TD.refine(isISODate, 'ISODate')
)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Type: t.Type<ISODate> = pipe(t.string, t.refine(isISODate, 'ISODate'))

/**
 * @since 0.0.1
 * @category Destructors
 */
export const toDate: (iso: ISODate) => Date = iso => new Date(iso)

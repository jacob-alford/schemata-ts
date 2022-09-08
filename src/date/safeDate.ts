/**
 * Represents Date objects which are not invalid dates
 *
 * @since 0.0.1
 */
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
 * @category Refinements
 */
export function isSafeDate(d: unknown): d is SafeDate {
  return d instanceof Date && !Number.isNaN(d.getTime())
}

/**
 * @since 0.0.1
 * @category Instances
 */
export const Guard: G.Guard<unknown, SafeDate> = {
  is: isSafeDate,
}

/**
 * @since 0.0.1
 * @category Instances
 */
export const Decoder: D.Decoder<unknown, SafeDate> = D.fromGuard(Guard, 'SafeDate')

/**
 * @since 0.0.1
 * @category Instances
 */
export const Eq: Eq_.Eq<SafeDate> = {
  equals: (x, y) => x.getTime() === y.getTime(),
}

/**
 * @since 0.0.1
 * @category Instances
 */
export const TaskDecoder: TD.TaskDecoder<unknown, SafeDate> = TD.fromDecoder(Decoder)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Type: t.Type<SafeDate> = new t_.Type<SafeDate, unknown, unknown>(
  'SafeDate',
  isSafeDate,
  (u, c) => (isSafeDate(u) ? t_.success(u) : t_.failure(u, c)),
  identity
)

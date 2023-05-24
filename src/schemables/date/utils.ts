import { SafeDate } from 'schemata-ts/schemables/date/definition'

/** @internal */
export function isSafeDate(d: unknown): d is SafeDate {
  return d instanceof Date && !Number.isNaN(d.getTime())
}

/** @internal */
export const isValidDateString = (s: unknown): s is string =>
  typeof s === 'string' && !Number.isNaN(new Date(s).getTime())

/** @internal */
export const isBeforeInc: (d: Date) => (d2: Date) => boolean = d => d2 =>
  d.getTime() <= d2.getTime()

/** @internal */
export const isAfterInc: (d: Date) => (d2: Date) => boolean = d => d2 =>
  d.getTime() >= d2.getTime()

/** @internal */
export const earliestSafeDate = new Date(-8640000000000000)

/** @internal */
export const latestSafeDate = new Date(8640000000000000)

import { type DateParams, type SafeDate } from 'schemata-ts/schemables/date/definition'

/** @internal */
export function isSafeDate(d: unknown): d is SafeDate {
  return d instanceof Date && !Number.isNaN(d.getTime())
}

/** @internal */
export const largestSafeMs = 8640000000000000

/** @internal */
export const smallestSafeMs = -8640000000000000

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
export const earliestSafeDate = new Date(smallestSafeMs)

/** @internal */
export const latestSafeDate = new Date(largestSafeMs)

export const getDateBoundsStr: (params?: DateParams) => string = (
  // istanbul ignore next
  params = {},
) => {
  const { afterDate, beforeDate } = params
  if (afterDate === undefined && beforeDate === undefined) return ''
  // istanbul ignore next
  const beforeDateStr = beforeDate?.toISOString()
  // istanbul ignore next
  const afterDateStr = afterDate?.toISOString()
  return `<${
    // istanbul ignore next
    afterDateStr ?? ''
  },${
    // istanbul ignore next
    beforeDateStr ?? ''
  }>`
}

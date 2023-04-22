/** @internal */
export function isSafeDate(d: unknown): d is Date {
  return d instanceof Date && !Number.isNaN(d.getTime())
}

/** @internal */
export const isValidDateString = (s: unknown): s is string =>
  typeof s === 'string' && !Number.isNaN(new Date(s).getTime())

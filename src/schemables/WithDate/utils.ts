/**
 * Utilities for `WithDate`
 *
 * @since 1.0.0
 */

/** @since 1.0.0 */
export function isSafeDate(d: unknown): d is Date {
  return d instanceof Date && !Number.isNaN(d.getTime())
}

/** @since 1.0.0 */
export const isValidDateString = (s: unknown): s is string =>
  typeof s === 'string' && !Number.isNaN(new Date(s).getTime())

/**
 * Utilies for `WithInt`
 *
 * @since 1.0.0
 */
import { Int, IntParams } from 'schemata-ts/schemables/WithInt/definition'

/** @since 1.0.0 */
export const isInt =
  ({ min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER }: IntParams = {}) =>
  (n: number): n is Int =>
    typeof n === 'number' &&
    !Number.isNaN(n) &&
    Number.isSafeInteger(n) &&
    n >= min &&
    n <= max

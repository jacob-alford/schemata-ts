import { Int, IntParams } from './definition'

/** @internal */
export const isInt =
  ({ min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER }: IntParams = {}) =>
  (n: number): n is Int =>
    typeof n === 'number' &&
    !Number.isNaN(n) &&
    Number.isSafeInteger(n) &&
    n >= min &&
    n <= max

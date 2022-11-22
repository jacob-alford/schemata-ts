import { Float, FloatParams } from './definition'

/** @internal */
export const isFloat =
  ({ min = -Number.MAX_VALUE, max = Number.MAX_VALUE }: FloatParams = {}) =>
  (n: number): n is Float =>
    typeof n === 'number' && !Number.isNaN(n) && n >= min && n <= max

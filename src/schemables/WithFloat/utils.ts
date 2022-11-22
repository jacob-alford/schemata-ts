/**
 * Utilities for `WithFloat`
 *
 * @since 1.0.0
 */
import { Float, FloatParams } from './definition'

/** @since 1.0.0 */
export const isFloat =
  ({ min = -Number.MAX_VALUE, max = Number.MAX_VALUE }: FloatParams = {}) =>
  (n: number): n is Float =>
    typeof n === 'number' && !Number.isNaN(n) && n >= min && n <= max

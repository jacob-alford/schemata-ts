/**
 * Integer branded newtype. Parameters: min, max are inclusive.
 *
 * Represents integers:
 *
 * ```math
 *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
 * ```
 *
 * @since 1.0.0
 */
import * as TD from 'io-ts/TaskDecoder'
import { WithInt2C } from '../definition'
import { isInt } from '../utils'
import { pipe } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithInt2C<TD.URI, unknown> = {
  int: params => pipe(TD.number, TD.refine(isInt(params), 'int')),
}

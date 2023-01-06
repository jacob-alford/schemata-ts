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
import { pipe } from 'fp-ts/function'
import * as TD from 'io-ts/TaskDecoder'
import { WithInt2C } from 'schemata-ts/schemables/WithInt/definition'
import { isInt } from 'schemata-ts/schemables/WithInt/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithInt2C<TD.URI, unknown> = {
  int: params => pipe(TD.number, TD.refine(isInt(params), 'int')),
}

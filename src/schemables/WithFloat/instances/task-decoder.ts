/**
 * Floating point branded newtype. Parameters: min, max are inclusive.
 *
 * Represents floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
 * ```
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import * as TD from 'io-ts/TaskDecoder'
import { WithFloat2C } from 'schemata-ts/schemables/WithFloat/definition'
import { isFloat } from 'schemata-ts/schemables/WithFloat/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithFloat2C<TD.URI, unknown> = {
  float: params => pipe(TD.number, TD.refine(isFloat(params), 'float')),
}

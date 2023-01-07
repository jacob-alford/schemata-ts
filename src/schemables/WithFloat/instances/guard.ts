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
import * as G from 'io-ts/Guard'
import { WithFloat1 } from 'schemata-ts/schemables/WithFloat/definition'
import { isFloat } from 'schemata-ts/schemables/WithFloat/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithFloat1<G.URI> = {
  float: params => pipe(G.number, G.refine(isFloat(params))),
}

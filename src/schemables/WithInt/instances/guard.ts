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
import * as G from 'io-ts/Guard'

import { WithInt1 } from '../definition'
import { isInt } from '../utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithInt1<G.URI> = {
  int: params => pipe(G.number, G.refine(isInt(params))),
}

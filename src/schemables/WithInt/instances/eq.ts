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
import * as Eq_ from 'fp-ts/Eq'
import * as N from 'fp-ts/number'
import { WithInt1 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithInt1<Eq_.URI> = { int: () => N.Eq }

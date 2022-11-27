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
import * as Enc from 'io-ts/Encoder'

import { WithInt2 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithInt2<Enc.URI> = { int: () => Enc.id() }

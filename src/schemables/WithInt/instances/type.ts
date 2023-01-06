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
import * as t from 'io-ts/Type'
import { WithInt1 } from 'schemata-ts/schemables/WithInt/definition'
import { isInt } from 'schemata-ts/schemables/WithInt/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithInt1<t.URI> = {
  int: params => pipe(t.number, t.refine(isInt(params), 'int')),
}

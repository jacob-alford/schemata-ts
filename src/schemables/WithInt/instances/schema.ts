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
import { URI as SchemaURI } from 'schemata-ts/Schema'
import { WithInt2 } from 'schemata-ts/schemables/WithInt/definition'
import * as SC from 'schemata-ts/Schema'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithInt2<SchemaURI>['int'] = params => SC.make(S => S.int(params))

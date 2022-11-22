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
import { URI as SchemaURI } from '../../../base/SchemaBase'
import * as SC from '../../../SchemaExt'
import { WithInt2 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithInt2<SchemaURI>['int'] = params => SC.make(S => S.int(params))

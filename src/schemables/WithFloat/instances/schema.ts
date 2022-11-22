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
import { URI as SchemaURI } from '../../../base/SchemaBase'
import * as SC from '../../../SchemaExt'
import { WithFloat2 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Schema: WithFloat2<SchemaURI>['float'] = params =>
  SC.make(S => S.float(params))

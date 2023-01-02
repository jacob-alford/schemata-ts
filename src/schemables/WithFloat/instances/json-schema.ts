/**
 * Floating point branded newtype. Parameters: min, max are inclusive.
 *
 * Represents floating point numbers:
 *
 * ```math
 *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
 * ```
 *
 * @since 1.2.0
 */
import * as JS from '../../../base/JsonSchemaBase'
import { WithFloat2 } from '../definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithFloat2<JS.URI> = {
  float(params = {}) {
    const { min = -Number.MAX_VALUE, max = Number.MAX_VALUE } = params
    return JS.makeNumberSchema(min, max)
  },
}

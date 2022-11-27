/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import * as D from '../../../base/DecoderBase'
import { WithPattern2C } from '../definition'
import { pattern } from '../utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithPattern2C<D.URI, unknown> = {
  pattern: (p, desc, caseInsensitive) =>
    D.fromGuard(pattern(p, desc, caseInsensitive), desc),
}

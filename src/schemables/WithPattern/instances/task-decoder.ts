/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import * as TD from '../../../base/TaskDecoderBase'
import { WithPattern2C } from '../definition'
import { pattern } from '../utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithPattern2C<TD.URI, unknown> = {
  pattern: (p, desc, caseInsensitive) =>
    TD.fromGuard(pattern(p, desc, caseInsensitive), desc),
}

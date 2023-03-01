/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import * as TD from 'schemata-ts/TaskDecoder'
import { WithPattern2C } from 'schemata-ts/schemables/WithPattern/definition'
import { pattern } from 'schemata-ts/schemables/WithPattern/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithPattern2C<TD.URI, unknown> = {
  pattern: (p, desc, caseInsensitive) =>
    TD.fromGuard(pattern(p, desc, caseInsensitive), desc),
}

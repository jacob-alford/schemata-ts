/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import * as D from 'schemata-ts/Decoder'
import { WithPattern2C } from 'schemata-ts/schemables/WithPattern/definition'
import { pattern } from 'schemata-ts/schemables/WithPattern/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithPattern2C<D.URI, unknown> = {
  pattern: (p, desc, caseInsensitive) =>
    D.fromGuard(pattern(p, desc, caseInsensitive), desc),
}

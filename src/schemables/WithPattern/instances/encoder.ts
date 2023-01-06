/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import * as Enc from 'io-ts/Encoder'
import { WithPattern2 } from 'schemata-ts/schemables/WithPattern/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithPattern2<Enc.URI> = {
  pattern: () => Enc.id(),
}

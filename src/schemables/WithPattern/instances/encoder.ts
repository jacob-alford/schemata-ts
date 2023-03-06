/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import * as Enc from 'io-ts/Encoder'
import { WithPattern } from 'schemata-ts/schemables/WithPattern/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithPattern<Enc.SchemableLambda> = {
  pattern: () => Enc.id(),
}

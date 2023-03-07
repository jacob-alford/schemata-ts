/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import * as Eq_ from 'schemata-ts/Eq'
import { WithPattern } from 'schemata-ts/schemables/WithPattern/definition'
import { Eq as P } from 'schemata-ts/schemables/WithPrimitives/instances/eq'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithPattern<Eq_.SchemableLambda> = {
  pattern: () => P.string(),
}

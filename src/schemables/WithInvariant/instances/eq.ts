/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import * as Eq_ from 'schemata-ts/Eq'
import { WithInvariant } from 'schemata-ts/schemables/WithInvariant/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithInvariant<Eq_.SchemableLambda> = {
  imap: () => (_, reverseGet) => eqA => ({
    equals: (x, y) => eqA.equals(reverseGet(x), reverseGet(y)),
  }),
}

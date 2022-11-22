/**
 * Invariant mapping for schemable
 *
 * @since 1.0.0
 */
import * as Eq_ from '../../../base/EqBase'
import { WithInvariant1 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithInvariant1<Eq_.URI> = {
  imap: () => (_, reverseGet) => eqA => ({
    equals: (x, y) => eqA.equals(reverseGet(x), reverseGet(y)),
  }),
}

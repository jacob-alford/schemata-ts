/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import * as G from 'schemata-ts/base/GuardBase'
import { WithOptional1 } from 'schemata-ts/schemables/WithOptional/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithOptional1<G.URI> = {
  optional: <A>(gA: G.Guard<unknown, A>): G.Guard<unknown, A | undefined> => ({
    is: (a): a is A | undefined => a === undefined || gA.is(a),
  }),
}

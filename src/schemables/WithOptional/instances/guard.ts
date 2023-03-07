/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import * as G from 'schemata-ts/Guard'
import { WithOptional } from 'schemata-ts/schemables/WithOptional/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithOptional<G.SchemableLambda> = {
  optional: <A>(gA: G.Guard<A>): G.Guard<A | undefined> => ({
    is: (a): a is A | undefined => a === undefined || gA.is(a),
  }),
}

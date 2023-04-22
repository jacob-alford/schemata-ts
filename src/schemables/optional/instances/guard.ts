import * as G from 'schemata-ts/internal/guard'
import { WithOptional } from 'schemata-ts/schemables/optional/definition'

export const OptionalGuard: WithOptional<G.SchemableLambda> = {
  optional: <A>(gA: G.Guard<A>): G.Guard<A | undefined> => ({
    is: (a): a is A | undefined => a === undefined || gA.is(a),
  }),
}

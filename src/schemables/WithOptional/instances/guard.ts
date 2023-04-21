import * as G from 'schemata-ts/Guard'
import { WithOptional } from 'schemata-ts/schemables/WithOptional/definition'

export const WithOptionalGuard: WithOptional<G.SchemableLambda> = {
  optional: <A>(gA: G.Guard<A>): G.Guard<A | undefined> => ({
    is: (a): a is A | undefined => a === undefined || gA.is(a),
  }),
}

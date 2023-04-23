import * as G from 'schemata-ts/internal/guard'
import { WithOptional } from 'schemata-ts/schemables/optional/definition'
import { ImplicitOptional, makeImplicitOptional } from 'schemata-ts/struct'

export const OptionalGuard: WithOptional<G.SchemableLambda> = {
  optional: <A>(gA: G.Guard<A>): ImplicitOptional & G.Guard<A | undefined> =>
    makeImplicitOptional<G.Guard<A | undefined>>(
      {
        is: (a): a is A | undefined => a === undefined || gA.is(a),
      },
      guard => Object.assign({}, guard),
    ),
}

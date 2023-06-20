import type * as G from 'schemata-ts/internal/guard'
import { type WithOptional } from 'schemata-ts/schemables/optional/definition'
import { type ImplicitOptional, makeImplicitOptionalType } from 'schemata-ts/struct'

export const OptionalGuard: WithOptional<G.SchemableLambda> = {
  optional: <A>(gA: G.Guard<A>): ImplicitOptional & G.Guard<A | undefined> =>
    makeImplicitOptionalType<G.Guard<A | undefined>>({
      is: (a): a is A | undefined => a === undefined || gA.is(a),
    }),
}

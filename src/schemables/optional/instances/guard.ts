import type * as G from 'schemata-ts/internal/guard'
import {
  type ImplicitOptional,
  makeImplicitOptionalType,
} from 'schemata-ts/internal/struct'
import {
  type OptionalParams,
  type WithOptional,
} from 'schemata-ts/schemables/optional/definition'

export const OptionalGuard: WithOptional<G.SchemableLambda> = {
  optional: <A, Fallback>(
    gA: G.Guard<A>,
    _: string,
    { fallbackInput }: OptionalParams<Fallback>,
  ): ImplicitOptional & G.Guard<A | undefined> =>
    makeImplicitOptionalType<G.Guard<A | undefined>>({
      is: (a): a is A | undefined =>
        (fallbackInput === undefined && a === undefined) || gA.is(a),
    }),
}

import * as Arb from 'schemata-ts/internal/arbitrary'
import { makeImplicitOptionalType } from 'schemata-ts/internal/struct'
import { type WithOptional } from 'schemata-ts/schemables/optional/definition'

export const OptionalArbitrary: WithOptional<Arb.SchemableLambda> = {
  optional: (arbA, _, { fallbackInput }) =>
    makeImplicitOptionalType(
      Arb.makeArbitrary(fc =>
        fallbackInput === undefined
          ? fc.oneof(arbA.arbitrary(fc), fc.constant(undefined))
          : arbA.arbitrary(fc),
      ),
    ),
}

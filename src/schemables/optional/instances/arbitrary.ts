import * as Arb from 'schemata-ts/internal/arbitrary'
import { makeImplicitOptionalType } from 'schemata-ts/internal/struct'
import { type WithOptional } from 'schemata-ts/schemables/optional/definition'

export const OptionalArbitrary: WithOptional<Arb.SchemableLambda> = {
  optional: arbA =>
    makeImplicitOptionalType(
      Arb.makeArbitrary(fc => fc.oneof(arbA.arbitrary(fc), fc.constant(undefined))),
    ),
}

import * as Arb from 'schemata-ts/internal/arbitrary'
import { type WithOptional } from 'schemata-ts/schemables/optional/definition'
import { makeImplicitOptionalType } from 'schemata-ts/struct'

export const OptionalArbitrary: WithOptional<Arb.SchemableLambda> = {
  optional: arbA =>
    makeImplicitOptionalType(
      Arb.makeArbitrary(fc => fc.oneof(arbA.arbitrary(fc), fc.constant(undefined))),
    ),
}

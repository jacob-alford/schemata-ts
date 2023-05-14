import * as Arb from 'schemata-ts/internal/arbitrary'
import { WithOptional } from 'schemata-ts/schemables/optional/definition'
import { makeImplicitOptional } from 'schemata-ts/struct'

export const OptionalArbitrary: WithOptional<Arb.SchemableLambda> = {
  optional: arbA =>
    makeImplicitOptional(
      {
        arbitrary: fc => fc.oneof(arbA.arbitrary(fc), fc.constant(undefined)),
      },
      arb => Object.assign({}, arb),
    ),
}

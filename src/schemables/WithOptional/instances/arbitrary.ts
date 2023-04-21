import * as Arb from 'schemata-ts/Arbitrary'
import { WithOptional } from 'schemata-ts/schemables/WithOptional/definition'

export const WithOptionalArbitrary: WithOptional<Arb.SchemableLambda> = {
  optional: arbA => ({
    arbitrary: fc => fc.oneof(arbA.arbitrary(fc), fc.constant(undefined)),
  }),
}

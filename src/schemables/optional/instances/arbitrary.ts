import * as Arb from 'schemata-ts/internal/arbitrary'
import { WithOptional } from 'schemata-ts/schemables/optional/definition'

export const WithOptionalArbitrary: WithOptional<Arb.SchemableLambda> = {
  optional: arbA => ({
    arbitrary: fc => fc.oneof(arbA.arbitrary(fc), fc.constant(undefined)),
  }),
}

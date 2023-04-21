import * as Arb from 'schemata-ts/internal/arbitrary'
import { WithRefine } from 'schemata-ts/schemables/WithRefine/definition'

export const WithRefineArbitrary: WithRefine<Arb.SchemableLambda> = {
  refine: refinement => from => ({
    arbitrary: fc => from.arbitrary(fc).filter(refinement),
  }),
}

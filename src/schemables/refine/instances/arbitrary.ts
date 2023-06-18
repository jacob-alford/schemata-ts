import * as Arb from 'schemata-ts/internal/arbitrary'
import { WithRefine } from 'schemata-ts/schemables/refine/definition'

export const RefineArbitrary: WithRefine<Arb.SchemableLambda> = {
  refine: refinement => from =>
    Arb.makeArbitrary(fc => from.arbitrary(fc).filter(refinement)),
}

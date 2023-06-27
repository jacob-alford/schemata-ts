import type * as Arb from 'schemata-ts/internal/arbitrary'
import { type WithRefine } from 'schemata-ts/schemables/refine/definition'

export const RefineArbitrary: WithRefine<Arb.SchemableLambda> = {
  refine: refinement => from => from.filter(refinement),
}

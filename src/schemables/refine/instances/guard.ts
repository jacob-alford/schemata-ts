import { pipe } from 'fp-ts/function'
import { compose } from 'fp-ts/Refinement'
import type * as G from 'schemata-ts/internal/guard'
import { type WithRefine } from 'schemata-ts/schemables/refine/definition'

export const RefineGuard: WithRefine<G.SchemableLambda> = {
  refine: refinement => from => ({
    is: pipe(from.is, compose(refinement)),
  }),
}

/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import { compose } from 'fp-ts/Refinement'
import * as G from 'schemata-ts/internal/guard'
import { WithRefine } from 'schemata-ts/schemables/refine/definition'

export const RefineGuard: WithRefine<G.SchemableLambda> = {
  refine: refinement => from => ({
    is: pipe(from.is, compose(refinement)),
  }),
}

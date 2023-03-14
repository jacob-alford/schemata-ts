/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import { compose } from 'fp-ts/Refinement'
import * as G from 'schemata-ts/Guard'
import { WithRefine } from 'schemata-ts/schemables/WithRefine/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithRefine<G.SchemableLambda> = {
  refine: refinement => from => ({
    is: pipe(from.is, compose(refinement)),
  }),
}

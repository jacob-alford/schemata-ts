/**
 * Used to refine a type to a subtype using a predicate function.
 *
 * @since 1.0.0
 */
import * as SC from 'schemata-ts/Schema'
import { WithRefine } from 'schemata-ts/schemables/WithRefine/definition'

/**
 * Used to refine a type to a subtype using a predicate function.
 *
 * @since 1.0.0
 * @category Instances
 */
export const Refine: WithRefine<SC.SchemableLambda>['refine'] =
  (refinement, refinedName) => from =>
    SC.make(_ => _.refine(refinement, refinedName)(from(_)))

/**
 * Re-export of `WithRefine` from `io-ts/Schemable/WithRefine`
 *
 * @since 1.0.0
 */
import * as Arb from 'schemata-ts/Arbitrary'
import { WithRefine } from 'schemata-ts/schemables/WithRefine/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithRefine<Arb.SchemableLambda> = {
  refine: refinement => from => ({
    arbitrary: fc => from.arbitrary(fc).filter(refinement),
  }),
}

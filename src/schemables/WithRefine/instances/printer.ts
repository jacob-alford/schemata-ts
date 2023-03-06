/** @since 1.1.0 */
import * as P from 'schemata-ts/Printer'
import { WithRefine } from 'schemata-ts/schemables/WithRefine/definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithRefine<P.SchemableLambda> = {
  refine: P.refine,
}

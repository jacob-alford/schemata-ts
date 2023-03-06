/** @since 1.2.0 */
import { identity } from 'fp-ts/function'
import * as JS from 'schemata-ts/JsonSchema'
import { WithRefine } from 'schemata-ts/schemables/WithRefine/definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithRefine<JS.SchemableLambda> = {
  refine: () => identity,
}

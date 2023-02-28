/** @since 1.2.0 */
import { identity } from 'fp-ts/function'
import * as JS from 'schemata-ts/internal/json-schema'
import { WithRefine } from 'schemata-ts/schemables/WithRefine/definition'

export const WithRefineJsonSchema: WithRefine<JS.SchemableLambda> = {
  refine: () => identity,
}

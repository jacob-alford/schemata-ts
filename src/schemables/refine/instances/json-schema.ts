import { identity } from 'fp-ts/function'
import type * as JS from 'schemata-ts/internal/json-schema'
import { type WithRefine } from 'schemata-ts/schemables/refine/definition'

export const RefineJsonSchema: WithRefine<JS.SchemableLambda> = {
  refine: () => identity,
}

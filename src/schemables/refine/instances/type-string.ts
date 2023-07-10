import { type SchemableLambda, makeTypeString } from 'schemata-ts/internal/type-string'
import { type WithRefine } from 'schemata-ts/schemables/refine/definition'

export const RefineTypeString: WithRefine<SchemableLambda> = {
  refine: (_, newName) => oldName => makeTypeString([oldName[0], newName]),
}

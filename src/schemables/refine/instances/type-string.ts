import {
  type SchemableLambda,
  fold,
  makeTypeString,
} from 'schemata-ts/internal/type-string'
import { type WithRefine } from 'schemata-ts/schemables/refine/definition'

export const RefineTypeString: WithRefine<SchemableLambda> = {
  refine: (_, newName) => oldName => makeTypeString([fold(oldName), newName]),
}

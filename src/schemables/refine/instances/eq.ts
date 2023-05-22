import { identity } from 'fp-ts/function'
import * as Eq from 'schemata-ts/internal/eq'
import { WithRefine } from 'schemata-ts/schemables/refine/definition'

export const RefineEq: WithRefine<Eq.SchemableLambda> = {
  refine: () => identity,
}

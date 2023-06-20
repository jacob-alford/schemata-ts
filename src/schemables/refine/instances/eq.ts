import { identity } from 'fp-ts/function'
import type * as Eq from 'schemata-ts/internal/eq'
import { type WithRefine } from 'schemata-ts/schemables/refine/definition'

export const RefineEq: WithRefine<Eq.SchemableLambda> = {
  refine: () => identity,
}

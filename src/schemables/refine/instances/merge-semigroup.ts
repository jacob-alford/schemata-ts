import { identity, unsafeCoerce } from 'fp-ts/function'
import type * as MSg from 'schemata-ts/internal/merge-semigroup'
import { type WithRefine } from 'schemata-ts/schemables/refine/definition'

export const RefineMergeSemigroup: WithRefine<MSg.SchemableLambda> = {
  refine: () => unsafeCoerce(identity),
}

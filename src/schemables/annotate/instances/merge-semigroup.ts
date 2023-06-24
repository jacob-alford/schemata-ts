import { constant, identity } from 'fp-ts/function'
import type * as MSg from 'schemata-ts/internal/merge-semigroup'
import { type WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const AnnotateMergeSemigroup: WithAnnotate<MSg.SchemableLambda> = {
  annotate: constant(identity),
}

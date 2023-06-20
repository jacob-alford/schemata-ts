import { constant, identity } from 'fp-ts/function'
import type * as G from 'schemata-ts/internal/guard'
import { type WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const AnnotateGuard: WithAnnotate<G.SchemableLambda> = {
  annotate: constant(identity),
}

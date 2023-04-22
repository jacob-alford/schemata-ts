import { constant, identity } from 'fp-ts/function'
import * as G from 'schemata-ts/internal/guard'
import { WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const AnnotateGuard: WithAnnotate<G.SchemableLambda> = {
  annotate: constant(identity),
}

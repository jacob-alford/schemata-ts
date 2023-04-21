import { constant, identity } from 'fp-ts/function'
import * as G from 'schemata-ts/internal/guard'
import { WithAnnotate } from 'schemata-ts/schemables/WithAnnotate/definition'

export const WithAnnotateGuard: WithAnnotate<G.SchemableLambda> = {
  annotate: constant(identity),
}

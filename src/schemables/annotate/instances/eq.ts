import { constant, identity } from 'fp-ts/function'
import * as Eq from 'schemata-ts/internal/eq'
import { WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const AnnotateEq: WithAnnotate<Eq.SchemableLambda> = {
  annotate: constant(identity),
}

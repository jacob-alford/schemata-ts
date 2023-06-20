import { constant, identity } from 'fp-ts/function'
import type * as Eq from 'schemata-ts/internal/eq'
import { type WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const AnnotateEq: WithAnnotate<Eq.SchemableLambda> = {
  annotate: constant(identity),
}

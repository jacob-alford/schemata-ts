import { constant, identity } from 'fp-ts/function'
import type * as Inf from 'schemata-ts/internal/information'
import { type WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const AnnotateInformation: WithAnnotate<Inf.SchemableLambda> = {
  annotate: constant(identity),
}

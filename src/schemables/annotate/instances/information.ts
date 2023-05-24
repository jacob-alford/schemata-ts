import { constant, identity } from 'fp-ts/function'
import * as Inf from 'schemata-ts/internal/information'
import { WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const AnnotateInformation: WithAnnotate<Inf.SchemableLambda> = {
  annotate: constant(identity),
}

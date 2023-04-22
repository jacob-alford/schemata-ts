import { constant, identity } from 'fp-ts/function'
import * as TC from 'schemata-ts/internal/transcoder'
import { WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const AnnotateTranscoder: WithAnnotate<TC.SchemableLambda> = {
  annotate: constant(identity),
}

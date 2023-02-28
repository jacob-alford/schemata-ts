import { constant, identity } from 'fp-ts/function'
import * as TC from 'schemata-ts/internal/Transcoder'
import { WithAnnotate } from 'schemata-ts/schemables/WithAnnotate/definition'

export const WithAnnotateTranscoder: WithAnnotate<TC.SchemableLambda> = {
  annotate: constant(identity),
}

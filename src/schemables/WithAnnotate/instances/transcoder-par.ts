import { constant, identity } from 'fp-ts/function'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { WithAnnotate } from 'schemata-ts/schemables/WithAnnotate/definition'

export const WithAnnotateTranscoderPar: WithAnnotate<TCP.SchemableLambda> = {
  annotate: constant(identity),
}

import { constant, identity } from 'fp-ts/function'
import type * as TCP from 'schemata-ts/internal/transcoder-par'
import { type WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const AnnotateTranscoderPar: WithAnnotate<TCP.SchemableLambda> = {
  annotate: constant(identity),
}

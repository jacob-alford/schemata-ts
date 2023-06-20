import { constant, identity } from 'fp-ts/function'
import type * as TC from 'schemata-ts/internal/transcoder'
import { type WithAnnotate } from 'schemata-ts/schemables/annotate/definition'

export const AnnotateTranscoder: WithAnnotate<TC.SchemableLambda> = {
  annotate: constant(identity),
}

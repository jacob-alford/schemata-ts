import { flow, pipe } from 'fp-ts/function'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { type WithPrimitives } from 'schemata-ts/schemables/primitives/definition'
import { PrimitivesTranscoder } from 'schemata-ts/schemables/primitives/instances/transcoder'

export const PrimitivesTranscoderPar: WithPrimitives<TCP.SchemableLambda> = {
  string: flow(PrimitivesTranscoder.string, TCP.fromTranscoder),
  int: flow(PrimitivesTranscoder.int, TCP.fromTranscoder),
  float: flow(PrimitivesTranscoder.float, TCP.fromTranscoder),
  boolean: pipe(PrimitivesTranscoder.boolean, TCP.fromTranscoder),
  unknown: pipe(PrimitivesTranscoder.unknown, TCP.fromTranscoder),
  literal: flow(PrimitivesTranscoder.literal, TCP.fromTranscoder),
}

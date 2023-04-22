import { flow, pipe } from 'fp-ts/function'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { WithPrimitives } from 'schemata-ts/schemables/primitives/definition'
import { Decoder } from 'schemata-ts/schemables/primitives/instances/decoder'

/** @since 2.0.0 */
export const WithPrimitivesTranscoderPar: WithPrimitives<TCP.SchemableLambda> = {
  string: flow(Decoder.string, PD.fromDecoder),
  int: flow(Decoder.int, PD.fromDecoder),
  float: flow(Decoder.float, PD.fromDecoder),
  boolean: pipe(Decoder.boolean, PD.fromDecoder),
  unknown: pipe(Decoder.unknown, PD.fromDecoder),
  literal: flow(Decoder.literal, PD.fromDecoder),
}

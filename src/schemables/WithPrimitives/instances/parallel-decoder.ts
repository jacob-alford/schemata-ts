import { flow, pipe } from 'fp-ts/function'
import * as PD from 'schemata-ts/internal/ParallelDecoder'
import { WithPrimitives } from 'schemata-ts/schemables/WithPrimitives/definition'
import { Decoder } from 'schemata-ts/schemables/WithPrimitives/instances/decoder'

/** @since 2.0.0 */
export const ParallelDecoder: WithPrimitives<PD.SchemableLambda> = {
  string: flow(Decoder.string, PD.fromDecoder),
  int: flow(Decoder.int, PD.fromDecoder),
  float: flow(Decoder.float, PD.fromDecoder),
  boolean: pipe(Decoder.boolean, PD.fromDecoder),
  unknown: pipe(Decoder.unknown, PD.fromDecoder),
  literal: flow(Decoder.literal, PD.fromDecoder),
}

import { flow } from 'fp-ts/function'
import * as PD from 'schemata-ts/internal/parallel-decoder'
import { WithPattern } from 'schemata-ts/schemables/WithPattern/definition'
import { Decoder } from 'schemata-ts/schemables/WithPattern/instances/decoder'

export const WithPatternParallelDecoder: WithPattern<PD.SchemableLambda> = {
  pattern: flow(Decoder.pattern, PD.fromDecoder),
}

import * as PD from 'schemata-ts/internal/parallel-decoder'
import { WithJson } from 'schemata-ts/schemables/WithJson/definition'
import { Decoder } from 'schemata-ts/schemables/WithJson/instances/decoder'

export const WithJsonParallelDecoder: WithJson<PD.SchemableLambda> = {
  json: PD.fromDecoder(Decoder.json),
  jsonString: PD.fromDecoder(Decoder.jsonString),
}

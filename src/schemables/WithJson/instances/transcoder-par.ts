import * as TCP from 'schemata-ts/internal/transcoder-par'
import { WithJson } from 'schemata-ts/schemables/WithJson/definition'
import { Decoder } from 'schemata-ts/schemables/WithJson/instances/decoder'

export const WithJsonTranscoderPar: WithJson<TCP.SchemableLambda> = {
  json: PD.fromDecoder(Decoder.json),
  jsonString: PD.fromDecoder(Decoder.jsonString),
}

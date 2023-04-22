import { flow } from 'fp-ts/function'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { WithPattern } from 'schemata-ts/schemables/pattern/definition'
import { Decoder } from 'schemata-ts/schemables/pattern/instances/decoder'

export const WithPatternTranscoderPar: WithPattern<TCP.SchemableLambda> = {
  pattern: flow(Decoder.pattern, PD.fromDecoder),
}

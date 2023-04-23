import { flow } from 'fp-ts/function'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { WithPattern } from 'schemata-ts/schemables/pattern/definition'
import { PatternTranscoder } from 'schemata-ts/schemables/pattern/instances/transcoder'

export const PatternTranscoderPar: WithPattern<TCP.SchemableLambda> = {
  pattern: flow(PatternTranscoder.pattern, TCP.fromTranscoder),
}

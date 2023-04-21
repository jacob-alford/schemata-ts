import * as TCP from 'schemata-ts/internal/transcoder-par'
import { WithDate } from 'schemata-ts/schemables/WithDate/definition'
import { WithDateTranscoder as Transcoder } from 'schemata-ts/schemables/WithDate/instances/transcoder'

export const WithDateTranscoderPar: WithDate<TCP.SchemableLambda> = {
  date: TCP.fromTranscoder(Transcoder.date),
  dateFromString: TCP.fromTranscoder(Transcoder.dateFromString),
}

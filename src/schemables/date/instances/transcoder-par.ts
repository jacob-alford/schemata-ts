import * as TCP from 'schemata-ts/internal/transcoder-par'
import { WithDate } from 'schemata-ts/schemables/date/definition'
import { DateTranscoder as Transcoder } from 'schemata-ts/schemables/date/instances/transcoder'

export const DateTranscoderPar: WithDate<TCP.SchemableLambda> = {
  date: TCP.fromTranscoder(Transcoder.date),
  dateFromString: TCP.fromTranscoder(Transcoder.dateFromString),
}

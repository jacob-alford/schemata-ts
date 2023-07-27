import { flow } from 'fp-ts/function'
import * as TCP from 'schemata-ts/internal/transcoder-par'
import { type WithDate } from 'schemata-ts/schemables/date/definition'
import { DateTranscoder as Transcoder } from 'schemata-ts/schemables/date/instances/transcoder'

export const DateTranscoderPar: WithDate<TCP.SchemableLambda> = {
  date: flow(Transcoder.date, TCP.fromTranscoder),
  dateFromString: flow(Transcoder.dateFromString, TCP.fromTranscoder),
}

import * as PD from 'schemata-ts/internal/parallel-decoder'
import { WithDate } from 'schemata-ts/schemables/WithDate/definition'
import { Decoder } from 'schemata-ts/schemables/WithDate/instances/decoder'

export const WithDateParallelDecoder: WithDate<PD.SchemableLambda> = {
  date: PD.fromDecoder(Decoder.date),
  dateFromString: PD.fromDecoder(Decoder.dateFromString),
}

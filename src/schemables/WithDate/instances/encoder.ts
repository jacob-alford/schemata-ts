import * as Enc from 'schemata-ts/Encoder'
import { WithDate } from 'schemata-ts/schemables/WithDate/definition'

export const WithDateEncoder: WithDate<Enc.SchemableLambda> = {
  date: Enc.id(),
  dateFromString: { encode: d => d.toISOString() },
}

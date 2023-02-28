import { URI as SchemaURI } from 'schemata-ts/Schema'
import * as SC from 'schemata-ts/Schema'
import { WithDate } from 'schemata-ts/schemables/WithDate/definition'

export const Schema: WithDate<SchemaURI> = {
  date: SC.make(S => S.date),
  dateFromString: SC.make(S => S.dateFromString),
}

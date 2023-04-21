import * as Arb from 'schemata-ts/Arbitrary'
import { WithDate } from 'schemata-ts/schemables/WithDate/definition'
import { isSafeDate } from 'schemata-ts/schemables/WithDate/utils'

export const WithDateArbitrary: WithDate<Arb.SchemableLambda> = {
  date: { arbitrary: fc => fc.date().filter(isSafeDate) },
  dateFromString: { arbitrary: fc => fc.date().filter(isSafeDate) },
}

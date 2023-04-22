import * as Arb from 'schemata-ts/internal/arbitrary'
import { WithDate } from 'schemata-ts/schemables/date/definition'
import { isSafeDate } from 'schemata-ts/schemables/date/utils'

export const WithDateArbitrary: WithDate<Arb.SchemableLambda> = {
  date: { arbitrary: fc => fc.date().filter(isSafeDate) },
  dateFromString: { arbitrary: fc => fc.date().filter(isSafeDate) },
}

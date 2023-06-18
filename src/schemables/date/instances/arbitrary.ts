import * as Arb from 'schemata-ts/internal/arbitrary'
import { WithDate } from 'schemata-ts/schemables/date/definition'
import {
  earliestSafeDate,
  isSafeDate,
  latestSafeDate,
} from 'schemata-ts/schemables/date/utils'

export const DateArbitrary: WithDate<Arb.SchemableLambda> = {
  date: (params = {}) => {
    const { beforeDate = latestSafeDate, afterDate = earliestSafeDate } = params
    return Arb.makeArbitrary(fc =>
      fc.date({ min: afterDate, max: beforeDate }).filter(isSafeDate),
    )
  },
  dateFromString: (params = {}) => {
    const { beforeDate = latestSafeDate, afterDate = earliestSafeDate } = params
    return Arb.makeArbitrary(fc =>
      fc.date({ min: afterDate, max: beforeDate }).filter(isSafeDate),
    )
  },
}

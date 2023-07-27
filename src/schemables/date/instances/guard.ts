import type * as G from 'schemata-ts/internal/guard'
import { type SafeDate, type WithDate } from 'schemata-ts/schemables/date/definition'
import {
  earliestSafeDate,
  isAfterInc,
  isBeforeInc,
  isSafeDate,
  latestSafeDate,
} from 'schemata-ts/schemables/date/utils'

export const DateGuard: WithDate<G.SchemableLambda> = {
  date: (params = {}) => {
    const { beforeDate = latestSafeDate, afterDate = earliestSafeDate } = params
    return {
      is: (u): u is SafeDate =>
        isSafeDate(u) && isBeforeInc(afterDate)(u) && isAfterInc(beforeDate)(u),
    }
  },
  dateFromString: (params = {}) => {
    const { beforeDate = latestSafeDate, afterDate = earliestSafeDate } = params
    return {
      is: (i): i is SafeDate =>
        isSafeDate(i) && isBeforeInc(afterDate)(i) && isAfterInc(beforeDate)(i),
    }
  },
}

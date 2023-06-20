import * as Inf from 'schemata-ts/internal/information'
import { type SafeDate, type WithDate } from 'schemata-ts/schemables/date/definition'
import { earliestSafeDate, latestSafeDate } from 'schemata-ts/schemables/date/utils'

const informationFromDateRange = (
  beforeDate: Date,
  afterDate: Date,
): Inf.Information<SafeDate> => {
  const dyr = afterDate.getFullYear() - beforeDate.getFullYear()
  const dmo = afterDate.getMonth() - beforeDate.getMonth()
  const dd = afterDate.getDate() - beforeDate.getDate()
  const dhr = afterDate.getHours() - beforeDate.getHours()
  const dmi = afterDate.getMinutes() - beforeDate.getMinutes()
  const ds = afterDate.getSeconds() - beforeDate.getSeconds()
  const dms = afterDate.getMilliseconds() - beforeDate.getMilliseconds()
  return Inf.informationFromSampleSize(dyr * dmo * dd * dhr * dmi * ds * dms)
}

export const DateInformation: WithDate<Inf.SchemableLambda> = {
  date: (params = {}) => {
    const { beforeDate = latestSafeDate, afterDate = earliestSafeDate } = params
    return informationFromDateRange(beforeDate, afterDate)
  },
  dateFromString: (params = {}) => {
    const { beforeDate = latestSafeDate, afterDate = earliestSafeDate } = params
    return informationFromDateRange(beforeDate, afterDate)
  },
}

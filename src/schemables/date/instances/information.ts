import * as Inf from 'schemata-ts/internal/information'
import { type SafeDate, type WithDate } from 'schemata-ts/schemables/date/definition'
import { earliestSafeDate, latestSafeDate } from 'schemata-ts/schemables/date/utils'

const informationFromDateRange = (
  beforeDate: Date,
  afterDate: Date,
): Inf.Information<SafeDate> => {
  const dyr = beforeDate.getFullYear() - afterDate.getFullYear()
  const dmo = beforeDate.getMonth() - afterDate.getMonth()
  const dd = beforeDate.getDate() - afterDate.getDate()
  const dhr = beforeDate.getHours() - afterDate.getHours()
  const dmi = beforeDate.getMinutes() - afterDate.getMinutes()
  const ds = beforeDate.getSeconds() - afterDate.getSeconds()
  const dms = beforeDate.getMilliseconds() - afterDate.getMilliseconds()
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

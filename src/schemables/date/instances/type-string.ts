import { type SchemableLambda, makeTypeString } from 'schemata-ts/internal/type-string'
import { type WithDate } from 'schemata-ts/schemables/date/definition'
import { getDateBoundsStr } from 'schemata-ts/schemables/date/utils'

export const DateTypeString: WithDate<SchemableLambda> = {
  date: (params = {}) => makeTypeString(`Date${getDateBoundsStr(params)}`),
  dateFromString: (params = {}) =>
    makeTypeString([
      `DateString${getDateBoundsStr(params)}`,
      `Date${getDateBoundsStr(params)}`,
    ]),
}

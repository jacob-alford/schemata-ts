import * as G from 'schemata-ts/internal/guard'
import { WithDate } from 'schemata-ts/schemables/date/definition'
import { isSafeDate } from 'schemata-ts/schemables/date/utils'

export const DateGuard: WithDate<G.SchemableLambda> = {
  date: {
    is: isSafeDate,
  },
  dateFromString: {
    is: isSafeDate,
  },
}

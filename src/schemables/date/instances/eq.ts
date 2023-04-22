import * as Eq_ from 'schemata-ts/Eq'
import { WithDate } from 'schemata-ts/schemables/date/definition'

export const DateEq: WithDate<Eq_.SchemableLambda> = {
  date: {
    equals: (x, y) => x.getTime() === y.getTime(),
  },
  dateFromString: {
    equals: (x, y) => x.getTime() === y.getTime(),
  },
}

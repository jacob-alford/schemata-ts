import * as Eq from 'schemata-ts/internal/eq'
import { WithDate } from 'schemata-ts/schemables/date/definition'

export const DateEq: WithDate<Eq.SchemableLambda> = {
  date: () => ({
    equals: (x, y) => x.getTime() === y.getTime(),
  }),
  dateFromString: () => ({
    equals: (x, y) => x.getTime() === y.getTime(),
  }),
}

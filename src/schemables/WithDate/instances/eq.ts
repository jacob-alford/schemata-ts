/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import * as Eq_ from 'schemata-ts/Eq'
import { WithDate } from 'schemata-ts/schemables/WithDate/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithDate<Eq_.SchemableLambda> = {
  date: {
    equals: (x, y) => x.getTime() === y.getTime(),
  },
  dateFromString: {
    equals: (x, y) => x.getTime() === y.getTime(),
  },
}

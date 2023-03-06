/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import * as G from 'schemata-ts/Guard'
import { WithDate } from 'schemata-ts/schemables/WithDate/definition'
import { isSafeDate } from 'schemata-ts/schemables/WithDate/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithDate<G.SchemableLambda> = {
  date: {
    is: isSafeDate,
  },
  dateFromString: {
    is: isSafeDate,
  },
}

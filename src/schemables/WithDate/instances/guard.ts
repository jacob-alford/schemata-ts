/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import * as G from 'io-ts/Guard'
import { WithDate1 } from '../definition'
import { isSafeDate } from '../utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithDate1<G.URI> = {
  date: {
    is: isSafeDate,
  },
  dateFromString: {
    is: isSafeDate,
  },
}

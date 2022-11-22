/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import * as Eq_ from 'fp-ts/Eq'
import { WithDate1 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithDate1<Eq_.URI> = {
  date: {
    equals: (x, y) => x.getTime() === y.getTime(),
  },
  dateFromString: {
    equals: (x, y) => x.getTime() === y.getTime(),
  },
}

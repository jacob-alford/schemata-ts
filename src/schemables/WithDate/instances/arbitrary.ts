/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import * as Arb from '../../../base/ArbitraryBase'
import * as fc from 'fast-check'
import { WithDate1 } from '../definition'
import { isSafeDate } from '../utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithDate1<Arb.URI> = {
  date: fc.date().filter(isSafeDate),
  dateFromString: fc.date().filter(isSafeDate),
}

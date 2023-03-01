/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import * as Arb from 'schemata-ts/Arbitrary'
import { WithDate1 } from 'schemata-ts/schemables/WithDate/definition'
import { isSafeDate } from 'schemata-ts/schemables/WithDate/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithDate1<Arb.URI> = {
  date: { arbitrary: fc => fc.date().filter(isSafeDate) },
  dateFromString: { arbitrary: fc => fc.date().filter(isSafeDate) },
}

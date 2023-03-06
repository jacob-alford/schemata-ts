/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import * as Arb from 'schemata-ts/Arbitrary'
import { WithDate } from 'schemata-ts/schemables/WithDate/definition'
import { isSafeDate } from 'schemata-ts/schemables/WithDate/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithDate<Arb.SchemableLambda> = {
  date: { arbitrary: fc => fc.date().filter(isSafeDate) },
  dateFromString: { arbitrary: fc => fc.date().filter(isSafeDate) },
}

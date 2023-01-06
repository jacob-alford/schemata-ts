/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import { identity } from 'fp-ts/function'
import * as t_ from 'io-ts'
import * as t from 'io-ts/Type'
import { WithDate1 } from 'schemata-ts/schemables/WithDate/definition'
import { isSafeDate, isValidDateString } from 'schemata-ts/schemables/WithDate/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithDate1<t.URI> = {
  date: new t_.Type<Date, unknown, unknown>(
    'SafeDate',
    isSafeDate,
    (u, c) => (isSafeDate(u) ? t_.success(u) : t_.failure(u, c)),
    identity,
  ),
  dateFromString: new t_.Type<Date, unknown, unknown>(
    'SafeDate',
    isSafeDate,
    (u, c) => (isValidDateString(u) ? t_.success(new Date(u)) : t_.failure(u, c)),
    identity,
  ),
}

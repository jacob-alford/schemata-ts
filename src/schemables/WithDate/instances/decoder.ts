/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import * as D from 'io-ts/Decoder'
import { WithDate2C } from 'schemata-ts/schemables/WithDate/definition'
import { Guard } from 'schemata-ts/schemables/WithDate/instances/guard'
import { isValidDateString } from 'schemata-ts/schemables/WithDate/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithDate2C<D.URI, unknown> = {
  date: D.fromGuard(Guard.date, 'Date.date'),
  dateFromString: {
    decode: s =>
      isValidDateString(s) ? D.success(new Date(s)) : D.failure(s, 'Date.dateFromString'),
  },
}

import * as SC from 'schemata-ts/Schema'
import {
  DateParams,
  SafeDate,
  SafeDateString,
} from 'schemata-ts/schemables/date/definition'

/**
 * Parses any string parseable with `Date.parse` to a `Date` object.
 *
 * @since 1.0.0
 * @category Schema
 */
export const DateFromString = (
  params?: DateParams,
): SC.Schema<SafeDateString, SafeDate> => SC.make(S => S.dateFromString(params))

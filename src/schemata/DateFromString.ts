/** @since 1.0.0 */
import { make } from 'schemata-ts/internal/schema'
import { type Schema } from 'schemata-ts/Schema'
import {
  type DateParams,
  type SafeDate,
  type SafeDateString,
} from 'schemata-ts/schemables/date/definition'

/**
 * Parses any string parseable with `Date.parse` to a `Date` object.
 *
 * @since 1.0.0
 * @category Conversion
 */
export const DateFromString = (params?: DateParams): Schema<SafeDateString, SafeDate> =>
  make(S => S.dateFromString(params))

/**
 * The date parser (used in DateFromString) accepts different strings depending on
 * runtime, and also accepts other formats like `February 29, 2022`.
 *
 * `DateFromIsoString` follows a subset of the [ECMAScript 2023 Language Date Time String
 * Specification](https://tc39.es/ecma262/#sec-date-time-string-format).
 *
 * Notable features:
 *
 * Permissible (simple) date / date-time formats (cannot contain milliseconds, date-time
 * separator, nor timezone):
 *
 * - `YYYY-(MM|M)-(DD|D)`
 * - `YYYY-(MM|M)-(DD|D) (HH|H):(mm|m)`
 * - `YYYY-(MM|M)-(DD|D) (HH|H):(mm|m):(ss|s)`
 * - `YYYY (MM|M) (DD|D)`
 * - `YYYY (MM|M) (DD|D) (HH|H):(mm|m)`
 * - `YYYY (MM|M) (DD|D) (HH|H):(mm|m):(ss|s)`
 *
 * Note:
 *
 * - Does not permit a three-digit year.
 * - Allows mixing padded / unpadded months, days, hours, minutes, seconds.
 *
 * Permissible (advanced) date-times - optionally contains date-time separator,
 * milliseconds, and timezone (configurable):
 *
 * - Permits date strings, and date-time strings
 * - Permits simple date-times with four-digit years that contain either spaces or hyphens
 *   as separators, e.g. `2021-01-01` or `2021 1 1`
 * - Date-time strings must use use a colon to separate hour from minute, and minute from
 *   second. period to separate second from millisecond.
 * - Date-time strings may contain seconds, seconds and milliseconds, or neither.
 * - Date-time strings may start with an expanded year if starting with a plus or minus sign.
 * - Date-time strings may contain a Date / Time separator T between days and hours or a space.
 * - Date-time strings may contain a UTC offset character "Z" following milliseconds.
 *
 * @since 1.0.0
 */

import * as PB from '../../PatternBuilder'
import { make, SchemaExt } from '../../SchemaExt'
import { Branded } from 'io-ts'
import { pipe } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Model
 */
export type DateFromIsoStringParams = {
  /**
   * Require date-time string to include a timezone offset, e.g. `Z` or `±05:00`.
   *
   * @since 1.0.0
   */
  readonly requireTimezoneOffset?: boolean
}

/**
 * @since 1.0.0
 * @category Model
 */
export type DateFromIsoStringS = () => SchemaExt<string, Date>

/**
 * @since 1.0.0
 * @category Pattern
 */
const year: PB.Pattern = pipe(PB.digit, PB.exactly(4))

/**
 * E.g. `+-002022`
 *
 * @since 1.0.0
 * @category Pattern
 */
const expandedYear: PB.Pattern = pipe(
  PB.characterClass(false, '+', '-'),
  PB.subgroup,
  PB.then(pipe(PB.digit, PB.exactly(6))),
)

/**
 * E.g. 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
 *
 * @since 1.0.0
 * @category Pattern
 */
const shortMonth: PB.Pattern = pipe(PB.integerRange(1, 12), PB.subgroup)

/**
 * E.g. 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12
 *
 * @since 1.0.0
 * @category Pattern
 */
const month: PB.Pattern = pipe(
  PB.char('0'),
  PB.then(pipe(PB.integerRange(1, 9), PB.subgroup)),
  PB.subgroup,
  PB.or(pipe(PB.integerRange(10, 12), PB.subgroup)),
  PB.subgroup,
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const shortDay: PB.Pattern = pipe(PB.integerRange(1, 31), PB.subgroup)

/**
 * E.g. 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12
 *
 * @since 1.0.0
 * @category Pattern
 */
const day: PB.Pattern = pipe(
  PB.char('0'),
  PB.then(pipe(PB.integerRange(1, 9), PB.subgroup)),
  PB.subgroup,
  PB.or(pipe(PB.integerRange(10, 31), PB.subgroup)),
  PB.subgroup,
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const simpleSeparator: PB.Pattern = PB.characterClass(false, '-', ' ')

/**
 * @since 1.0.0
 * @category Pattern
 */
const simpleDayMonth: PB.Pattern = pipe(
  shortDay,
  PB.then(simpleSeparator),
  PB.then(shortMonth),
  PB.subgroup,
  PB.or(pipe(day, PB.then(simpleSeparator), PB.then(month))),
  PB.subgroup,
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const simpleDate: PB.Pattern = pipe(
  year,
  PB.then(simpleSeparator),
  PB.then(simpleDayMonth),
)

/**
 * The date parser (used in DateFromString) accepts different strings depending on
 * runtime, and also accepts other formats like `February 29, 2022`.
 *
 * `DateFromIsoString` follows a subset of the [ECMAScript 2023 Language Date Time String
 * Specification](https://tc39.es/ecma262/#sec-date-time-string-format).
 *
 * Notable features:
 *
 * - Permits date strings, and date-time strings
 * - Permits simple dates with four-digit years that contain either spaces or hyphens as
 *   separators, e.g. `2021-01-01` or `2021 1 1`
 * - Date-time strings must use hyphens to separate year from month, and month from day;
 *   must use a colon to separate hour from minute, and minute from second; and must use a
 *   period to separate second from millisecond.
 * - Date-time strings may contain seconds, seconds and milliseconds, or neither.
 * - Date-time strings may start with an expanded year if starting with a plus or minus sign.
 * - Date-time strings may contain a Date / Time separator T between days and hours or a space.
 * - Date-time strings may contain a UTC offset character "Z" following milliseconds.
 *
 * @since 1.0.0
 * @category Schema
 */
export const DateFromIsoString: DateFromIsoStringS = () => make(s => s.dateFromString)

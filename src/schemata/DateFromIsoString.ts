/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import * as k from 'kuvio'
import { deriveGuard } from 'schemata-ts/derivations/guard-schemable'
import { type Schema } from 'schemata-ts/Schema'
import {
  type SafeDate,
  type SafeDateString,
  type SafeDateStringBrand,
} from 'schemata-ts/schemables/date/definition'
import { Brand } from 'schemata-ts/schemata/Brand'
import { Date as DateS } from 'schemata-ts/schemata/Date'
import { Imap } from 'schemata-ts/schemata/Imap'
import { Pattern } from 'schemata-ts/schemata/Pattern'
import { Refine } from 'schemata-ts/schemata/Refine'

/**
 * E.g. `2022`
 *
 * @since 1.0.0
 * @category Pattern
 */
const year: k.Pattern = pipe(k.digit, k.exactly(4))

/**
 * E.g. `+-002022`
 *
 * @since 1.0.0
 * @category Pattern
 */
const expandedYear: k.Pattern = pipe(
  k.characterClass(false, '+', '-'),
  k.subgroup,
  k.andThen(pipe(k.digit, k.exactly(6))),
)

/**
 * E.g. 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12
 *
 * @since 1.0.0
 * @category Pattern
 */
const month: k.Pattern = pipe(
  k.char('0'),
  k.andThen(pipe(k.integerRange(1, 9), k.subgroup)),
  k.subgroup,
  k.or(pipe(k.integerRange(10, 12), k.subgroup)),
  k.subgroup,
)

/**
 * E.g. 01, 02, 03, 04, 05, ..., 30, 31
 *
 * @since 1.0.0
 * @category Pattern
 */
const day: k.Pattern = pipe(
  k.char('0'),
  k.andThen(pipe(k.integerRange(1, 9), k.subgroup)),
  k.subgroup,
  k.or(pipe(k.integerRange(10, 31), k.subgroup)),
  k.subgroup,
)

/**
 * E.g. `YYYY-MM-DD`
 *
 * @since 1.0.0
 * @category Pattern
 */
const yearMonthDay: k.Pattern = k.sequence(
  k.subgroup(k.oneOf(year, expandedYear)),
  k.char('-'),
  month,
  k.char('-'),
  day,
)

/**
 * E.g. `YYYY-MM`
 *
 * @since 1.0.0
 * @category Pattern
 */
const yearMonth: k.Pattern = k.subgroup(
  k.sequence(k.subgroup(k.oneOf(year, expandedYear)), k.char('-'), month),
)

/**
 * E.G. `YYYY-MM-DD` or `YYYY-MM` or `YYYY`
 *
 * @since 1.0.0
 * @category Pattern
 */
const date: k.Pattern = k.subgroup(k.oneOf(yearMonthDay, yearMonth, year, expandedYear))

/**
 * E.g. 00, 01, 02, 03, 04, 05, 06, 07, ..., 22, 23
 *
 * @since 1.0.0
 * @category Pattern
 */
const hour: k.Pattern = pipe(
  k.char('0'),
  k.andThen(pipe(k.integerRange(0, 9), k.subgroup)),
  k.subgroup,
  k.or(pipe(k.integerRange(10, 23), k.subgroup)),
  k.subgroup,
)

/**
 * E.g. 00, 01, 02, 03, 04, 05, 06, 07, ..., 58, 59
 *
 * @since 1.0.0
 * @category Pattern
 */
export const minutesSeconds: k.Pattern = pipe(
  k.char('0'),
  k.andThen(pipe(k.integerRange(0, 9), k.subgroup)),
  k.subgroup,
  k.or(pipe(k.integerRange(10, 59), k.subgroup)),
  k.subgroup,
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const milliseconds: k.Pattern = pipe(k.digit, k.atLeastOne(), k.subgroup)

/**
 * E.g. `Z` or `±05:00`
 *
 * @since 1.0.0
 * @category Pattern
 */
const timezoneOffset: k.Pattern = pipe(
  k.char('Z'),
  k.or(
    pipe(
      k.characterClass(false, '+', '-'),
      k.andThen(hour),
      k.andThen(k.char(':')),
      k.andThen(minutesSeconds),
    ),
  ),
  k.subgroup,
)

/**
 * E.g. `HH:mm:ss.SSS`
 *
 * @since 1.0.0
 * @category Pattern
 */
const hrMinSecMs: k.Pattern = pipe(
  hour,
  k.andThen(k.char(':')),
  k.andThen(minutesSeconds),
  k.andThen(k.char(':')),
  k.andThen(minutesSeconds),
  k.andThen(k.char('.')),
  k.andThen(milliseconds),
)

/**
 * E.g. `HH:mm:ss`
 *
 * @since 1.0.0
 * @category Pattern
 */
const hrMinSec: k.Pattern = pipe(
  hour,
  k.andThen(k.char(':')),
  k.andThen(minutesSeconds),
  k.andThen(k.char(':')),
  k.andThen(minutesSeconds),
)

/**
 * E.g. `HH:mm`
 *
 * @since 1.0.0
 * @category Pattern
 */
const hrMin: k.Pattern = pipe(hour, k.andThen(k.char(':')), k.andThen(minutesSeconds))

/**
 * Iso time string
 *
 * @since 1.0.0
 * @category Pattern
 */
const time: k.Pattern = pipe(hrMinSecMs, k.or(hrMinSec), k.or(hrMin), k.subgroup)

/**
 * @since 1.0.0
 * @category Pattern
 */
const dateTimeStringOptT: k.Pattern = pipe(
  date,
  k.andThen(
    pipe(
      k.char('T'),
      k.or(k.char(' ')),
      k.subgroup,
      k.andThen(time),
      k.subgroup,
      k.maybe,
    ),
  ),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const dateTimeStringReqT: k.Pattern = pipe(
  date,
  k.andThen(pipe(k.char('T'), k.or(k.char(' ')), k.subgroup)),
  k.andThen(time),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const isoDateStringOptTzOptT: k.Pattern = pipe(
  dateTimeStringOptT,
  k.andThen(pipe(timezoneOffset, k.maybe)),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const isoDateStringOptTzReqT: k.Pattern = pipe(
  dateTimeStringReqT,
  k.andThen(pipe(timezoneOffset, k.maybe)),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const isoDateStringReqTzReqT: k.Pattern = pipe(
  dateTimeStringReqT,
  k.andThen(timezoneOffset),
)

/**
 * @since 1.0.0
 * @category Model
 */
export type DateFromIsoStringParams = {
  /**
   * Configuration to require string to include time, time and timezone offset, or neither.
   *
   * - `None` => date, or date-string, or date-string and timezone offset are allowed
   * - `Time` => date-string, or date-string and timezone offset are allowed
   * - `TimeAndOffset` => date-string and timezone offset are required
   *
   * @since 1.0.0
   */
  readonly requireTime?: 'None' | 'Time' | 'TimeAndOffset'
}

/**
 * The Date parser (used in DateFromString) accepts different strings depending on
 * runtime, and also accepts other formats like `February 29, 2022`.
 *
 * `DateFromIsoString` follows a subset of the [ECMAScript 2023 Language Date Time String
 * Specification](https://tc39.es/ecma262/#sec-date-time-string-format).
 *
 * Notable features:
 *
 * - Requires padded months, days, hours, minutes, and seconds
 * - Can be configured to require a time, time and timezone offset (e.g. `Z` or `±05:00`) or
 *   neither (default is require both).
 * - Dates may contain years, months, and days; years and months; or years
 * - Times may contain hours, minutes, seconds, and milliseconds; hours, minutes, and
 *   seconds; or hours and minutes.
 * - Expanded years are permitted (e.g. `+002022` instead of `2022`)
 *
 * @since 1.0.0
 * @category Conversion
 */
export const DateFromIsoString: (
  params?: DateFromIsoStringParams,
) => Schema<SafeDateString, SafeDate> = (params = {}) => {
  const { requireTime = 'TimeAndOffset' } = params
  const pattern = (() => {
    switch (requireTime) {
      case 'None':
        return isoDateStringOptTzOptT
      case 'Time':
        return isoDateStringOptTzReqT
      case 'TimeAndOffset':
        return isoDateStringReqTzReqT
    }
  })()
  return pipe(
    Pattern(
      pattern,
      requireTime === 'TimeAndOffset'
        ? 'IsoDateTimeStringZ'
        : requireTime === 'Time'
        ? 'IsoDateTimeString'
        : 'IsoDateString',
    ),
    Refine((s): s is SafeDateString => !Number.isNaN(new Date(s).getTime()), 'SafeDate'),
    Brand<SafeDateStringBrand>(),
    Imap(
      deriveGuard(DateS()),
      s => new Date(s) as SafeDate,
      d => d.toISOString() as SafeDateString,
    ),
  )
}

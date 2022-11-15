/**
 * The Date parser (used in DateFromString) accepts different strings depending on
 * runtime, and also accepts other formats like `February 29, 2022`.
 *
 * `DateFromIsoString` follows a subset of the [ECMAScript 2023 Language Date Time String
 * Specification](https://tc39.es/ecma262/#sec-date-time-string-format).
 *
 * Notable features:
 *
 * - Requires `T` separator between date and time
 * - Requires padded months, days, hours, minutes, and seconds
 * - Can be configured to require a time, time and timezone offset (e.g. `Z` or `±05:00`) or
 *   neither (default is require both).
 * - Dates may contain years, months, and days; years and months; or years
 * - Times may contain hours, minutes, seconds, and milliseconds; hours, minutes, and
 *   seconds; or hours and minutes.
 * - Expanded years are permitted (e.g. `+002022` instead of `2022`)
 *
 * @since 1.0.0
 */

import { pipe } from 'fp-ts/function'
import * as PB from '../../PatternBuilder'
import { make, SchemaExt } from '../../SchemaExt'
import * as D from '../../schemables/WithDate'
import { match } from '../../internal/match'

/**
 * E.g. `2022`
 *
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
 * E.g. 01, 02, 03, 04, 05, ..., 30, 31
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
 * E.g. `YYYY-MM-DD`
 *
 * @since 1.0.0
 * @category Pattern
 */
const yearMonthDay: PB.Pattern = pipe(
  year,
  PB.or(expandedYear),
  PB.subgroup,
  PB.then(PB.char('-')),
  PB.then(month),
  PB.then(PB.char('-')),
  PB.then(day),
)

/**
 * E.g. `YYYY-MM`
 *
 * @since 1.0.0
 * @category Pattern
 */
const yearMonth: PB.Pattern = pipe(
  year,
  PB.or(expandedYear),
  PB.subgroup,
  PB.then(PB.char('-')),
  PB.then(month),
)

/**
 * E.G. `YYYY-MM-DD` or `YYYY-MM` or `YYYY`
 *
 * @since 1.0.0
 * @category Pattern
 */
const date: PB.Pattern = pipe(yearMonthDay, PB.or(yearMonth), PB.or(year), PB.subgroup)

/**
 * E.g. 00, 01, 02, 03, 04, 05, 06, 07, ..., 22, 23
 *
 * @since 1.0.0
 * @category Pattern
 */
const hour: PB.Pattern = pipe(
  PB.char('0'),
  PB.then(pipe(PB.integerRange(0, 9), PB.subgroup)),
  PB.subgroup,
  PB.or(pipe(PB.integerRange(10, 23), PB.subgroup)),
  PB.subgroup,
)

/**
 * E.g. 00, 01, 02, 03, 04, 05, 06, 07, ..., 58, 59
 *
 * @since 1.0.0
 * @category Pattern
 */
export const minutesSeconds: PB.Pattern = pipe(
  PB.char('0'),
  PB.then(pipe(PB.integerRange(0, 9), PB.subgroup)),
  PB.subgroup,
  PB.or(pipe(PB.integerRange(10, 59), PB.subgroup)),
  PB.subgroup,
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const milliseconds: PB.Pattern = pipe(PB.digit, PB.atLeastOne(), PB.subgroup)

/**
 * E.g. `Z` or `±05:00`
 *
 * @since 1.0.0
 * @category Pattern
 */
const timezoneOffset: PB.Pattern = pipe(
  PB.char('Z'),
  PB.or(
    pipe(
      PB.characterClass(false, '+', '-'),
      PB.then(hour),
      PB.then(PB.char(':')),
      PB.then(minutesSeconds),
    ),
  ),
  PB.subgroup,
)

/**
 * E.g. `HH:mm:ss.SSS`
 *
 * @since 1.0.0
 * @category Pattern
 */
const hrMinSecMs: PB.Pattern = pipe(
  hour,
  PB.then(PB.char(':')),
  PB.then(minutesSeconds),
  PB.then(PB.char(':')),
  PB.then(minutesSeconds),
  PB.then(PB.char('.')),
  PB.then(milliseconds),
)

/**
 * E.g. `HH:mm:ss`
 *
 * @since 1.0.0
 * @category Pattern
 */
const hrMinSec: PB.Pattern = pipe(
  hour,
  PB.then(PB.char(':')),
  PB.then(minutesSeconds),
  PB.then(PB.char(':')),
  PB.then(minutesSeconds),
)

/**
 * E.g. `HH:mm`
 *
 * @since 1.0.0
 * @category Pattern
 */
const hrMin: PB.Pattern = pipe(hour, PB.then(PB.char(':')), PB.then(minutesSeconds))

/**
 * Iso time string
 *
 * @since 1.0.0
 * @category Pattern
 */
const time: PB.Pattern = pipe(hrMinSecMs, PB.or(hrMinSec), PB.or(hrMin), PB.subgroup)

/**
 * @since 1.0.0
 * @category Pattern
 */
const dateTimeStringOptT: PB.Pattern = pipe(
  date,
  PB.then(pipe(PB.char('T'), PB.then(time), PB.subgroup, PB.maybe)),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const dateTimeStringReqT: PB.Pattern = pipe(date, PB.then(PB.char('T')), PB.then(time))

/**
 * @since 1.0.0
 * @category Pattern
 */
const isoDateStringOptTzOptT: PB.Pattern = pipe(
  dateTimeStringOptT,
  PB.then(pipe(timezoneOffset, PB.maybe)),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const isoDateStringOptTzReqT: PB.Pattern = pipe(
  dateTimeStringReqT,
  PB.then(pipe(timezoneOffset, PB.maybe)),
)

/**
 * @since 1.0.0
 * @category Pattern
 */
const isoDateStringReqTzReqT: PB.Pattern = pipe(
  dateTimeStringReqT,
  PB.then(timezoneOffset),
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
 * @since 1.0.0
 * @category Model
 */
export type DateFromIsoStringS = (
  params?: DateFromIsoStringParams,
) => SchemaExt<string, Date>

/**
 * The Date parser (used in DateFromString) accepts different strings depending on
 * runtime, and also accepts other formats like `February 29, 2022`.
 *
 * `DateFromIsoString` follows a subset of the [ECMAScript 2023 Language Date Time String
 * Specification](https://tc39.es/ecma262/#sec-date-time-string-format).
 *
 * Notable features:
 *
 * - Requires `T` separator between date and time
 * - Requires padded months, days, hours, minutes, and seconds
 * - Can be configured to require a time, time and timezone offset (e.g. `Z` or `±05:00`) or
 *   neither (default is require both).
 * - Dates may contain years, months, and days; years and months; or years
 * - Times may contain hours, minutes, seconds, and milliseconds; hours, minutes, and
 *   seconds; or hours and minutes.
 * - Expanded years are permitted (e.g. `+002022` instead of `2022`)
 *
 * @since 1.0.0
 * @category Schema
 */
export const DateFromIsoString: DateFromIsoStringS = (params = {}) => {
  const { requireTime = 'TimeAndOffset' } = params
  return make(S =>
    pipe(
      S.pattern(
        pipe(
          { tag: requireTime },
          match({
            None: () => isoDateStringOptTzOptT,
            Time: () => isoDateStringOptTzReqT,
            TimeAndOffset: () => isoDateStringReqTzReqT,
          }),
        ),
        'IsoDateString',
      ),
      S.refine((s): s is string => D.Guard.date.is(new Date(s)), 'SafeDateString'),
      S.imap(D.Guard.date, 'DateFromIsoString')(
        s => new Date(s),
        d => d.toISOString(),
      ),
    ),
  )
}

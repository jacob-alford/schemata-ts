/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import { getGuard } from 'schemata-ts/derivations/guard-schemable'
import { type Integer } from 'schemata-ts/integer'
import { type Schema } from 'schemata-ts/Schema'
import { type SafeDate } from 'schemata-ts/schemables/date/definition'
import { Date as DateS } from 'schemata-ts/schemata/Date'
import { Imap } from 'schemata-ts/schemata/Imap'
import { Int } from 'schemata-ts/schemata/Int'

/**
 * Represents Date objects derived from time in milliseconds.
 *
 * @since 1.0.0
 * @category Conversion
 */
export const DateFromInt: Schema<
  Integer<-8_640_000_000_000_000, 8_640_000_000_000_000>,
  SafeDate
> = pipe(
  Int({ min: -8_640_000_000_000_000, max: 8_640_000_000_000_000 }),
  Imap(
    getGuard(DateS()),
    n => new Date(n) as SafeDate,
    d => d.getTime() as Integer<-8_640_000_000_000_000, 8_640_000_000_000_000>,
  ),
)

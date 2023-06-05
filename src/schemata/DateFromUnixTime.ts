/**
 * Represents Date objects derived from unix time.
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { getGuard } from 'schemata-ts/derivations/guard-schemable'
import { Float } from 'schemata-ts/float'
import { Schema } from 'schemata-ts/Schema'
import { Date as DateS } from 'schemata-ts/schemata/Date'
import { Float as FloatS } from 'schemata-ts/schemata/Float'
import { Imap } from 'schemata-ts/schemata/Imap'

/**
 * Represents Date objects derived from unix time.
 *
 * @since 1.0.0
 * @category Schema
 */
export const DateFromUnixTime: Schema<Float, Date> = pipe(
  FloatS(),
  Imap(
    getGuard(DateS()),
    n => new Date(n * 1000),
    d => (d.getTime() / 1000) as Float,
  ),
)

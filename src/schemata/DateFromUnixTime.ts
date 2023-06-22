/**
 * Represents Date objects derived from unix time.
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { getGuard } from 'schemata-ts/derivations/guard-schemable'
import { getTypeString } from 'schemata-ts/derivations/type-string-schemable'
import { type Float } from 'schemata-ts/float'
import * as TS from 'schemata-ts/internal/type-string'
import { type Schema } from 'schemata-ts/Schema'
import { Date as DateS } from 'schemata-ts/schemata/Date'
import { Float as FloatS } from 'schemata-ts/schemata/Float'
import { Imap } from 'schemata-ts/schemata/Imap'

/** @since 2.0.0 */
export type MinUnixTime = -8_640_000_000_000

/** @since 2.0.0 */
export const minUnixTime: MinUnixTime = -8_640_000_000_000

/** @since 2.0.0 */
export type MaxUnixTime = 8_640_000_000_000

/** @since 2.0.0 */
export const maxUnixTime: MaxUnixTime = 8_640_000_000_000

const UnixTimeFloat = FloatS({
  min: minUnixTime,
  max: maxUnixTime,
})

const DateSchema = DateS()

/**
 * Represents Date objects derived from unix time.
 *
 * @since 1.0.0
 * @category Schema
 */
export const DateFromUnixTime: Schema<Float<MinUnixTime, MaxUnixTime>, Date> = pipe(
  UnixTimeFloat,
  Imap(
    getGuard(DateSchema),
    n => new Date(n * 1000),
    d => (d.getTime() / 1000) as Float<MinUnixTime, MaxUnixTime>,
    TS.fold(getTypeString(DateSchema)),
  ),
)

/**
 * Represents Date objects derived from time in milliseconds.
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { SchemaExt, make } from '../../SchemaExt'
import * as int from '../../number/int'
import * as date from '../../date/date'

/**
 * @since 1.0.0
 * @category Model
 */
export type DateFromIntS = SchemaExt<number, Date>

/**
 * Represents Date objects derived from time in milliseconds.
 *
 * @since 1.0.0
 * @category Schema
 */
export const DateFromInt: DateFromIntS = make(S =>
  pipe(
    S.int({ min: -8_640_000_000_000_000, max: 8_640_000_000_000_000 }),
    S.imap(date.Guard, 'DateFromInt')(
      n => new Date(n),
      d => d.getTime() as int.Int
    )
  )
)

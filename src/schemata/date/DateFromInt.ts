/**
 * Represents Date objects derived from time in milliseconds.
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import { make, Schema } from 'schemata-ts/Schema'
import { Guard } from 'schemata-ts/schemables/WithDate/instances/guard'
import * as int from 'schemata-ts/schemables/WithInt/definition'

/**
 * @since 1.0.0
 * @category Model
 */
export type DateFromIntS = Schema<number, Date>

/**
 * Represents Date objects derived from time in milliseconds.
 *
 * @since 1.0.0
 * @category Schema
 */
export const DateFromInt: DateFromIntS = make(S =>
  pipe(
    S.int({ min: -8_640_000_000_000_000, max: 8_640_000_000_000_000 }),
    S.imap(Guard.date, 'DateFromInt')(
      n => new Date(n),
      d => d.getTime() as int.Int,
    ),
  ),
)

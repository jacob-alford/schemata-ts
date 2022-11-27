/**
 * Represents Date objects derived from unix time.
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'

import { Guard } from '../../schemables/WithDate/instances/guard'
import * as float from '../../schemables/WithFloat/definition'
import { make, SchemaExt } from '../../SchemaExt'

/**
 * @since 1.0.0
 * @category Model
 */
export type DateFromUnixTimeS = SchemaExt<number, Date>

/**
 * Represents Date objects derived from unix time.
 *
 * @since 1.0.0
 * @category Schema
 */
export const DateFromUnixTime: DateFromUnixTimeS = make(S =>
  pipe(
    S.float({ min: -8_640_000_000_000, max: 8_640_000_000_000 }),
    S.imap(Guard.date, 'DateFromUnixTime')(
      n => new Date(n * 1000),
      d => (d.getTime() / 1000) as float.Float,
    ),
  ),
)

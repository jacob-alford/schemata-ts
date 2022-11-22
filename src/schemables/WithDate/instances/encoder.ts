/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import * as Enc from 'io-ts/Encoder'

import { WithDate2 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithDate2<Enc.URI> = {
  date: Enc.id(),
  dateFromString: { encode: d => d.toISOString() },
}

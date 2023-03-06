/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import * as Enc from 'io-ts/Encoder'
import { WithDate } from 'schemata-ts/schemables/WithDate/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithDate<Enc.SchemableLambda> = {
  date: Enc.id(),
  dateFromString: { encode: d => d.toISOString() },
}

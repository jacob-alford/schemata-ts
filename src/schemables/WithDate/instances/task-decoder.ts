/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import * as TD from 'io-ts/TaskDecoder'
import { WithDate2C } from 'schemata-ts/schemables/WithDate/definition'
import { Decoder } from 'schemata-ts/schemables/WithDate/instances/decoder'

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithDate2C<TD.URI, unknown> = {
  date: TD.fromDecoder(Decoder.date),
  dateFromString: TD.fromDecoder(Decoder.dateFromString),
}

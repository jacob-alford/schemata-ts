/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import * as PD from 'schemata-ts/internal/parallel-decoder'
import { WithDate } from 'schemata-ts/schemables/WithDate/definition'
import { Decoder } from 'schemata-ts/schemables/WithDate/instances/decoder'

/**
 * @since 1.0.0
 * @category Instances
 */
export const ParallelDecoder: WithDate<PD.SchemableLambda> = {
  date: PD.fromDecoder(Decoder.date),
  dateFromString: PD.fromDecoder(Decoder.dateFromString),
}

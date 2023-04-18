/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import * as PD from 'schemata-ts/internal/parallel-decoder'
import { WithJson } from 'schemata-ts/schemables/WithJson/definition'
import { Decoder } from 'schemata-ts/schemables/WithJson/instances/decoder'

/**
 * @since 1.1.0
 * @category Instances
 */
export const ParallelDecoder: WithJson<PD.SchemableLambda> = {
  json: PD.fromDecoder(Decoder.json),
  jsonString: PD.fromDecoder(Decoder.jsonString),
}

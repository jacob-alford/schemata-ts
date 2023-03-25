/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import { flow } from 'fp-ts/function'
import * as PD from 'schemata-ts/internal/ParallelDecoder'
import { WithPattern } from 'schemata-ts/schemables/WithPattern/definition'
import { Decoder } from 'schemata-ts/schemables/WithPattern/instances/decoder'

/**
 * @since 1.0.0
 * @category Instances
 */
export const ParallelDecoder: WithPattern<PD.SchemableLambda> = {
  pattern: flow(Decoder.pattern, PD.fromDecoder),
}

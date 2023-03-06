/**
 * Re-export of `WithRefine` from `io-ts/Schemable/WithRefine`
 *
 * @since 1.0.0
 */
import { identity } from 'fp-ts/function'
import * as Enc from 'io-ts/Encoder'
import { WithRefine } from 'schemata-ts/schemables/WithRefine/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithRefine<Enc.SchemableLambda> = {
  refine: () => identity,
}

/**
 * Re-export of `WithRefine` from `io-ts/Schemable/WithRefine`
 *
 * @since 1.0.0
 */
import { identity } from 'fp-ts/function'
import * as Enc from 'io-ts/Encoder'
import { WithRefine2 } from 'schemata-ts/schemables/WithRefine/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithRefine2<Enc.URI> = {
  refine: () => identity,
}

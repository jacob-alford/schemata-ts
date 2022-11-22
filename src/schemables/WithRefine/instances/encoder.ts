/**
 * Re-export of `WithRefine` from `io-ts/Schemable/WithRefine`
 *
 * @since 1.0.0
 */
import * as Enc from 'io-ts/Encoder'

import { WithRefine2 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithRefine2<Enc.URI> = {
  // @ts-expect-error -- refinement only changes type-level information, but types don't check out here
  refine: () => Enc.id,
}

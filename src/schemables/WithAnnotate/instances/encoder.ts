/**
 * Schemable for annotating a JSON Schema. Interpretation using interpreters other than
 * JsonSchema will not change the derivation.
 *
 * @since 1.2.0
 */
import { constant, identity } from 'fp-ts/function'

import * as Enc from '../../../base/EncoderBase'
import { WithAnnotate2 } from '../definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const Encoder: WithAnnotate2<Enc.URI> = {
  annotate: constant(identity),
}

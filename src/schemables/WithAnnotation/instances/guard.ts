/**
 * Schemable for annotating a JSON Schema. Interpretation using interpreters other than
 * JsonSchema will not change the derivation.
 *
 * @since 1.2.0
 */
import { constant, identity } from 'fp-ts/function'

import * as G from '../../../base/GuardBase'
import { WithAnnotation1 } from '../definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const Guard: WithAnnotation1<G.URI> = {
  annotate: constant(identity),
}

/**
 * Schemable for annotating a JSON Schema. Interpretation using interpreters other than
 * JsonSchema will not change the derivation.
 *
 * @since 1.2.0
 */
import * as Eq_ from 'fp-ts/Eq'
import { constant, identity } from 'fp-ts/function'

import { WithAnnotate1 } from '../definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const Eq: WithAnnotate1<Eq_.URI> = {
  annotate: constant(identity),
}

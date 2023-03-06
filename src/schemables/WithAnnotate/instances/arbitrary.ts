/**
 * Schemable for annotating a JSON Schema. Interpretation using interpreters other than
 * JsonSchema will not change the derivation.
 *
 * @since 1.2.0
 */
import { constant, identity } from 'fp-ts/function'
import * as Arb from 'schemata-ts/Arbitrary'
import { WithAnnotate } from 'schemata-ts/schemables/WithAnnotate/definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const Arbitrary: WithAnnotate<Arb.SchemableLambda> = {
  annotate: constant(identity),
}

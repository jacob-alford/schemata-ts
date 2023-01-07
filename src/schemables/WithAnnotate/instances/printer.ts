/**
 * Schemable for annotating a JSON Schema. Interpretation using interpreters other than
 * JsonSchema will not change the derivation.
 *
 * @since 1.2.0
 */
import { constant, identity } from 'fp-ts/function'
import * as P from 'schemata-ts/base/PrinterBase'
import { WithAnnotate2 } from 'schemata-ts/schemables/WithAnnotate/definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const Printer: WithAnnotate2<P.URI> = {
  annotate: constant(identity),
}

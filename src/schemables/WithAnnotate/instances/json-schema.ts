/**
 * Schemable for annotating a JSON Schema. Interpretation using interpreters other than
 * JsonSchema will not change the derivation.
 *
 * @since 1.2.0
 */
import * as JS from '../../../base/JsonSchemaBase'
import { WithAnnotate2 } from '../definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithAnnotate2<JS.URI> = {
  annotate: JS.annotate,
}

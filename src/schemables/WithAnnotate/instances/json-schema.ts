/**
 * Schemable for annotating a JSON Schema. Interpretation using interpreters other than
 * JsonSchema will not change the derivation.
 *
 * @since 1.2.0
 */
import * as JS from 'schemata-ts/base/JsonSchemaBase'
import { WithAnnotate2 } from 'schemata-ts/schemables/WithAnnotate/definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithAnnotate2<JS.URI> = {
  annotate: JS.annotate,
}

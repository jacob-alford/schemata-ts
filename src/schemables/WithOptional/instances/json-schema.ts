/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.2.0
 */
import * as JS from 'schemata-ts/base/JsonSchemaBase'
import { WithOptional2 } from 'schemata-ts/schemables/WithOptional/definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithOptional2<JS.URI> = {
  // Undefined is not a valid JSON Value
  optional: () => JS.emptySchema,
}

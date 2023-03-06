/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.2.0
 */
import * as JS from 'schemata-ts/JsonSchema'
import { WithOptional } from 'schemata-ts/schemables/WithOptional/definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithOptional<JS.SchemableLambda> = {
  // Undefined is not a valid JSON Value
  optional: () => JS.emptySchema,
}

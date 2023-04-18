/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.2.0
 */
import * as JS from 'schemata-ts/internal/json-schema'
import { WithOptional } from 'schemata-ts/schemables/WithOptional/definition'
import { makeImplicitOptional } from 'schemata-ts/struct'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithOptional<JS.SchemableLambda> = {
  optional: inner => makeImplicitOptional(inner, schema => Object.assign({}, schema)),
}

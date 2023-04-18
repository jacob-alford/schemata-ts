/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.2.0
 */
import * as JS from 'schemata-ts/internal/json-schema'
import { WithArray } from 'schemata-ts/schemables/WithArray/definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithArray<JS.SchemableLambda> = {
  array: item => JS.make(new JS.JsonArray(item)),
  tuple: (...items) => JS.make(new JS.JsonArray(items, items.length, items.length)),
}

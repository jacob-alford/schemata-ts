/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.2.0
 */
import { unsafeCoerce } from 'fp-ts/function'
import * as JS from 'schemata-ts/JsonSchema'
import { WithArray } from 'schemata-ts/schemables/WithArray/definition'

/**
 * @since 1.2.0
 * @category Instances
 */
export const JsonSchema: WithArray<JS.SchemableLambda> = {
  array: JS.makeArraySchema(),
  tuple: unsafeCoerce(JS.makeTupleSchema),
}

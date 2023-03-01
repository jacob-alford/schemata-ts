/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import * as TD from 'schemata-ts/TaskDecoder'
import { WithOptional2C } from 'schemata-ts/schemables/WithOptional/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithOptional2C<TD.URI, unknown> = {
  optional: tA => ({
    decode: u => (u === undefined ? TD.success(u) : tA.decode(u)),
  }),
}

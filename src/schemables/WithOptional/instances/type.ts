/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import * as t_ from 'io-ts'
import * as t from 'schemata-ts/base/TypeBase'
import { WithOptional1 } from 'schemata-ts/schemables/WithOptional/definition'
import { Encoder } from 'schemata-ts/schemables/WithOptional/instances/encoder'
import { Guard } from 'schemata-ts/schemables/WithOptional/instances/guard'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithOptional1<t.URI> = {
  optional: tA =>
    new t_.Type(
      `optional(${tA.name})`,
      Guard.optional(tA).is,
      u => (u === undefined ? t_.success(u) : tA.decode(u)),
      Encoder.optional(tA).encode,
    ),
}

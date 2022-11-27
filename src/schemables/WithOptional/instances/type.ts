/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import * as t_ from 'io-ts'

import * as t from '../../../base/TypeBase'
import { WithOptional1 } from '../definition'
import { Encoder } from './encoder'
import { Guard } from './guard'

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

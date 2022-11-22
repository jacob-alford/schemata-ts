/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import * as Arb from '../../../base/ArbitraryBase'
import * as fc from 'fast-check'
import { WithOptional1 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithOptional1<Arb.URI> = {
  optional: arbA => fc.oneof(arbA, fc.constant(undefined)),
}

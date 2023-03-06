/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import * as Arb from 'schemata-ts/Arbitrary'
import { WithOptional } from 'schemata-ts/schemables/WithOptional/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithOptional<Arb.SchemableLambda> = {
  optional: arbA => ({
    arbitrary: fc => fc.oneof(arbA.arbitrary(fc), fc.constant(undefined)),
  }),
}

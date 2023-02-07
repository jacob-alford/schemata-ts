/**
 * Arbitrary instance for WithUnknown
 *
 * @since 1.3.0
 */
import * as Arb from 'schemata-ts/base/ArbitraryBase'
import { WithUnknown1 } from 'schemata-ts/schemables/WithUnknown/definition'

/**
 * @since 1.3.0
 * @category Instances
 */
export const Arbitrary: WithUnknown1<Arb.URI> = {
  unknown: {
    arbitrary: fc => fc.anything(),
  },
}

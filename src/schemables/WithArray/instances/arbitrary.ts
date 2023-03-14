/**
 * Schemable for widening a type to include undefined. Similar to nullable but for undefined.
 *
 * @since 1.0.0
 */
import * as RA from 'fp-ts/ReadonlyArray'
import * as Arb from 'schemata-ts/Arbitrary'
import { WithArray } from 'schemata-ts/schemables/WithArray/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithArray<Arb.SchemableLambda> = {
  array: item => ({
    arbitrary: fc => fc.array(item.arbitrary(fc)),
  }),
  tuple: (...components) => ({
    arbitrary: fc => {
      if (components.length === 0) {
        return fc.constant(RA.zero())
      }
      return fc.tuple(...components.map(arb => arb.arbitrary(fc))) as any
    },
  }),
}

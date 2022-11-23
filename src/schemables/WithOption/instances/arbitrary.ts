/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.0.0
 */
import * as Arb from '../../../base/ArbitraryBase'
import { WithOption1 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithOption1<Arb.URI> = {
  optionFromExclude: (_, arbA) => ({
    arbitrary: fc =>
      fc.oneof(
        Arb.struct({ _tag: Arb.literal('None') }).arbitrary(fc),
        Arb.struct({
          _tag: Arb.literal('Some'),
          value: arbA,
        }).arbitrary(fc),
      ),
  }),
}

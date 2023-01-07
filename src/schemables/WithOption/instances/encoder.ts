/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.0.0
 */
import { flow } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as Enc from 'io-ts/Encoder'
import { WithOption2 } from 'schemata-ts/schemables/WithOption/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithOption2<Enc.URI> = {
  optionFromExclude: (exclude, sa) => ({
    encode: flow(
      O.getOrElseW(() => exclude),
      sa.encode,
    ),
  }),
}

/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.0.0
 */
import * as Eq_ from 'fp-ts/Eq'
import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'
import * as TD from 'io-ts/TaskDecoder'
import { WithOption2C } from '../definition'
import { flow } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithOption2C<TD.URI, unknown> = {
  optionFromExclude: (exclude, sa, eqA = Eq_.eqStrict) => ({
    decode: flow(sa.decode, TE.map(O.fromPredicate(a => !eqA.equals(a, exclude)))),
  }),
}

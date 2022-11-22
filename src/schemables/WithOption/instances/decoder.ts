/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.0.0
 */
import * as E from 'fp-ts/Either'
import * as Eq_ from 'fp-ts/Eq'
import * as O from 'fp-ts/Option'
import * as D from 'io-ts/Decoder'
import { WithOption2C } from '../definition'
import { flow } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithOption2C<D.URI, unknown> = {
  optionFromExclude: (exclude, sa, eqA = Eq_.eqStrict) => ({
    decode: flow(sa.decode, E.map(O.fromPredicate(a => !eqA.equals(a, exclude)))),
  }),
}

/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.0.0
 */
import * as E from 'fp-ts/Either'
import * as Eq_ from 'fp-ts/Eq'
import { flow } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as t_ from 'io-ts'
import * as t from 'io-ts/Type'
import { WithOption1 } from 'schemata-ts/schemables/WithOption/definition'
import { Encoder } from 'schemata-ts/schemables/WithOption/instances/encoder'
import { Guard } from 'schemata-ts/schemables/WithOption/instances/guard'

/**
 * @deprecated
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithOption1<t.URI> = {
  optionFromExclude: (exclude, tA, eqA = Eq_.eqStrict) =>
    new t_.Type(
      `OptionFromExclude<${tA.name}>`,
      Guard.optionFromExclude(exclude, tA).is,
      flow(tA.decode, E.map(O.fromPredicate(a => !eqA.equals(a, exclude)))),
      Encoder.optionFromExclude(exclude, tA).encode,
    ),
}

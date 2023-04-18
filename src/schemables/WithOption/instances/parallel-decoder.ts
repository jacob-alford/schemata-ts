/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.0.0
 */
import { flow } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'
import * as Eq_ from 'schemata-ts/Eq'
import * as PD from 'schemata-ts/internal/parallel-decoder'
import { WithOption } from 'schemata-ts/schemables/WithOption/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const ParallelDecoder: WithOption<PD.SchemableLambda> = {
  optionFromExclude: (exclude, sa, eqA = Eq_.eqStrict) => ({
    decode: flow(sa.decode, TE.map(O.fromPredicate(a => !eqA.equals(a, exclude)))),
  }),
}

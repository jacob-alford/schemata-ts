/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.0.0
 */
import * as O from 'fp-ts/Option'
import * as G from 'schemata-ts/Guard'
import { WithOption } from 'schemata-ts/schemables/WithOption/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Guard: WithOption<G.SchemableLambda> = {
  optionFromExclude: (_, guardA) => ({
    is: (u): u is O.Option<typeof _> =>
      typeof u === 'object' &&
      u !== null &&
      !Array.isArray(u) &&
      '_tag' in u &&
      (u._tag === 'None' || (u._tag === 'Some' && 'value' in u && guardA.is(u.value))),
  }),
}

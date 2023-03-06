/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.0.0
 */
import { flow, SK } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as Eq_ from 'schemata-ts/Eq'
import { WithOption } from 'schemata-ts/schemables/WithOption/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithOption<Eq_.SchemableLambda> = {
  optionFromExclude: flow(SK, O.getEq),
}

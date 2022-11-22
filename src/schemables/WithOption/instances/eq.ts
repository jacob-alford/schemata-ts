/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.0.0
 */
import * as Eq_ from 'fp-ts/Eq'
import * as O from 'fp-ts/Option'
import { WithOption1 } from '../definition'
import { SK, flow } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithOption1<Eq_.URI> = { optionFromExclude: flow(SK, O.getEq) }

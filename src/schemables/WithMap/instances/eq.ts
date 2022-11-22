/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import * as Eq_ from 'fp-ts/Eq'
import * as RM from 'fp-ts/ReadonlyMap'
import { WithMap1 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithMap1<Eq_.URI> = { mapFromEntries: (_, sk, sa) => RM.getEq(sk, sa) }

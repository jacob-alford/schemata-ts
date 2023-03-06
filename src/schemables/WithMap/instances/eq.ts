/**
 * Represents a ReadonlyMap converted from an expected array of entries.
 *
 * @since 1.0.0
 */
import * as RM from 'fp-ts/ReadonlyMap'
import * as Eq_ from 'schemata-ts/Eq'
import { WithMap } from 'schemata-ts/schemables/WithMap/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithMap<Eq_.SchemableLambda> = {
  mapFromEntries: (_, sk, sa) => RM.getEq(sk, sa),
}

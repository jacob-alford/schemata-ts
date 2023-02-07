/**
 * Eq instance for WithUnknown. Performs a strict equality check.
 *
 * @since 1.3.0
 */
import * as Eq_ from 'fp-ts/Eq'
import { WithUnknown1 } from 'schemata-ts/schemables/WithUnknown/definition'

/**
 * @since 1.3.0
 * @category Instances
 */
export const Eq: WithUnknown1<Eq_.URI> = {
  unknown: Eq_.eqStrict,
}

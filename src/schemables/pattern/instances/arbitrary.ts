/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import { arbitraryFromPattern } from 'kuvio/arbitrary-deferred'
import type * as Arb from 'schemata-ts/internal/arbitrary'
import { type WithPattern } from 'schemata-ts/schemables/pattern/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const PatternArbitrary: WithPattern<Arb.SchemableLambda> = {
  pattern: pattern => ({ arbitrary: fc => arbitraryFromPattern(fc)(pattern) }),
}

/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import { arbitraryFromPattern } from 'kuvio/arbitrary-deferred'
import * as Arb from 'schemata-ts/internal/arbitrary'
import { type WithPattern } from 'schemata-ts/schemables/pattern/definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const PatternArbitrary: WithPattern<Arb.SchemableLambda> = {
  pattern: pattern => Arb.makeArbitrary(fc => arbitraryFromPattern(fc)(pattern)),
}

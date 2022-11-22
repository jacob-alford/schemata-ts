/**
 * Schemable construction based on Regex combinators
 *
 * @since 1.0.0
 */
import * as Arb from '../../../base/ArbitraryBase'
import { arbitraryFromPattern } from '../../../PatternBuilder'
import { WithPattern1 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Arbitrary: WithPattern1<Arb.URI> = {
  pattern: arbitraryFromPattern,
}

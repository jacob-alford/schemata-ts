/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import * as Eq_ from 'fp-ts/Eq'
import { WithCheckDigit1 } from '../definition'
import { identity } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithCheckDigit1<Eq_.URI> = {
  checkDigit: () => identity,
}

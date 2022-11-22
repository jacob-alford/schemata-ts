/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import * as Eq_ from 'fp-ts/Eq'
import { identity } from 'fp-ts/function'

import { WithCheckDigit1 } from '../definition'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Eq: WithCheckDigit1<Eq_.URI> = {
  checkDigit: () => identity,
}

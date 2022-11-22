/**
 * Schemable for constructing a string with a check digit (e.g. ISBN or Credit Card)
 *
 * @since 1.0.0
 */
import * as Enc from '../../../base/EncoderBase'
import { WithCheckDigit2 } from '../definition'
import { identity } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithCheckDigit2<Enc.URI> = {
  checkDigit: () => identity,
}

/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.0.0
 */
import * as Enc from 'io-ts/Encoder'
import { WithPadding2 } from '../definition'
import { identity } from 'fp-ts/function'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Encoder: WithPadding2<Enc.URI> = {
  padLeft: () => identity,
  padRight: () => identity,
}

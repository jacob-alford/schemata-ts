/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.1.0
 */
import { identity } from 'fp-ts/function'

import * as P from '../../../base/PrinterBase'
import { WithPadding2 } from '../definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithPadding2<P.URI> = {
  padLeft: () => identity,
  padRight: () => identity,
}

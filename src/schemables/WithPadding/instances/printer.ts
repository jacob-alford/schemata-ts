/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.1.0
 */
import * as P from '../../../base/PrinterBase'
import { WithPadding2 } from '../definition'
import { foldUnion, match } from '../utils'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithPadding2<P.URI> = {
  padLeft: match({
    MaxLength: ({ maxLength }) =>
      P.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `LeftPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      P.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `LeftPadding`,
      ),
  }),
  padRight: match({
    MaxLength: ({ maxLength }) =>
      P.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `RightPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      P.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `RightPadding`,
      ),
  }),
}

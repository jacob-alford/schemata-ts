/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.0.0
 */
import * as D from 'io-ts/Decoder'
import { WithPadding2C } from 'schemata-ts/schemables/WithPadding/definition'
import { foldUnion, match } from 'schemata-ts/schemables/WithPadding/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithPadding2C<D.URI, unknown> = {
  padLeft: match({
    MaxLength: ({ maxLength }) =>
      D.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `LeftPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      D.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `LeftPadding`,
      ),
  }),
  padRight: match({
    MaxLength: ({ maxLength }) =>
      D.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `RightPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      D.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `RightPadding`,
      ),
  }),
}

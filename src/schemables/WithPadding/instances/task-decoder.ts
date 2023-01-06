/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.0.0
 */
import * as TD from 'io-ts/TaskDecoder'
import { WithPadding2C } from 'schemata-ts/schemables/WithPadding/definition'
import { foldUnion, match } from 'schemata-ts/schemables/WithPadding/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const TaskDecoder: WithPadding2C<TD.URI, unknown> = {
  padLeft: match({
    MaxLength: ({ maxLength }) =>
      TD.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `LeftPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      TD.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `LeftPadding`,
      ),
  }),
  padRight: match({
    MaxLength: ({ maxLength }) =>
      TD.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `RightPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      TD.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `RightPadding`,
      ),
  }),
}

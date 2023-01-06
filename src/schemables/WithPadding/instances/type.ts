/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.0.0
 */
import * as t from 'io-ts/Type'
import { WithPadding1 } from 'schemata-ts/schemables/WithPadding/definition'
import { foldUnion, match } from 'schemata-ts/schemables/WithPadding/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Type: WithPadding1<t.URI> = {
  padLeft: match({
    MaxLength: ({ maxLength }) =>
      t.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `LeftPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      t.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `LeftPadding`,
      ),
  }),
  padRight: match({
    MaxLength: ({ maxLength }) =>
      t.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `RightPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      t.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `RightPadding`,
      ),
  }),
}

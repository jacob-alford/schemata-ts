/**
 * Adds a character to the right or left of a string until it reaches a certain length.
 *
 * @since 1.0.0
 */
import * as PD from 'schemata-ts/internal/parallel-decoder'
import { WithPadding } from 'schemata-ts/schemables/WithPadding/definition'
import { foldUnion, match } from 'schemata-ts/schemables/WithPadding/utils'
import { ParallelDecoder as WithRefine } from 'schemata-ts/schemables/WithRefine/instances/parallel-decoder'

/**
 * @since 1.0.0
 * @category Instances
 */
export const ParallelDecoder: WithPadding<PD.SchemableLambda> = {
  padLeft: match({
    MaxLength: ({ maxLength }) =>
      WithRefine.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `LeftPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      WithRefine.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `LeftPadding`,
      ),
  }),
  padRight: match({
    MaxLength: ({ maxLength }) =>
      WithRefine.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `RightPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      WithRefine.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `RightPadding`,
      ),
  }),
}

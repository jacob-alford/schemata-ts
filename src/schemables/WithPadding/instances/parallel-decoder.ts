import * as PD from 'schemata-ts/internal/parallel-decoder'
import { WithPadding } from 'schemata-ts/schemables/WithPadding/definition'
import { foldUnion, match } from 'schemata-ts/schemables/WithPadding/utils'
import { ParallelDecoder as WithRefine } from 'schemata-ts/schemables/WithRefine/instances/parallel-decoder'

export const WithPaddingParallelDecoder: WithPadding<PD.SchemableLambda> = {
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

import * as TCP from 'schemata-ts/internal/transcoder-par'
import { WithPadding } from 'schemata-ts/schemables/padding/definition'
import { foldUnion, match } from 'schemata-ts/schemables/padding/utils'
import { ParallelDecoder as WithRefine } from 'schemata-ts/schemables/refine/instances/parallel-decoder'

export const PaddingTranscoderPar: WithPadding<TCP.SchemableLambda> = {
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

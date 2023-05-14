import * as TCP from 'schemata-ts/internal/transcoder-par'
import { WithPadding } from 'schemata-ts/schemables/padding/definition'
import { foldUnion, match } from 'schemata-ts/schemables/padding/utils'
import { RefineTranscoderPar } from 'schemata-ts/schemables/refine/instances/transcoder-par'

export const PaddingTranscoderPar: WithPadding<TCP.SchemableLambda> = {
  padLeft: match({
    MaxLength: ({ maxLength }) =>
      RefineTranscoderPar.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `LeftPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      RefineTranscoderPar.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `LeftPadding`,
      ),
  }),
  padRight: match({
    MaxLength: ({ maxLength }) =>
      RefineTranscoderPar.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `RightPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      RefineTranscoderPar.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `RightPadding`,
      ),
  }),
}

import * as TC from 'schemata-ts/internal/transcoder'
import { WithPadding } from 'schemata-ts/schemables/padding/definition'
import { foldUnion, match } from 'schemata-ts/schemables/padding/utils'
import { RefineTranscoder } from 'schemata-ts/schemables/refine/instances/transcoder'

export const PaddingTranscoder: WithPadding<TC.SchemableLambda> = {
  padLeft: match({
    MaxLength: ({ maxLength }) =>
      RefineTranscoder.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `LeftPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      RefineTranscoder.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `LeftPadding`,
      ),
  }),
  padRight: match({
    MaxLength: ({ maxLength }) =>
      RefineTranscoder.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `RightPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      RefineTranscoder.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `RightPadding`,
      ),
  }),
}

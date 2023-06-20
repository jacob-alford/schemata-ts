import type * as TCP from 'schemata-ts/internal/transcoder-par'
import { type WithPadding } from 'schemata-ts/schemables/padding/definition'
import { foldUnion, match } from 'schemata-ts/schemables/padding/utils'
import { RefineTranscoderPar } from 'schemata-ts/schemables/refine/instances/transcoder-par'

export const PaddingTranscoderPar: WithPadding<TCP.SchemableLambda> = {
  padLeft: match({
    MaxLength: ({ maxLength }) =>
      RefineTranscoderPar.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `ValidLeftPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      RefineTranscoderPar.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `ValidLeftPadding`,
      ),
  }),
  padRight: match({
    MaxLength: ({ maxLength }) =>
      RefineTranscoderPar.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        `ValidRightPadding`,
      ),
    ExactLength: ({ exactLength }) =>
      RefineTranscoderPar.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        `ValidRightPadding`,
      ),
  }),
}

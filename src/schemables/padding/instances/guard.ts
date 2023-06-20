import type * as G from 'schemata-ts/internal/guard'
import { type WithPadding } from 'schemata-ts/schemables/padding/definition'
import { foldUnion, match } from 'schemata-ts/schemables/padding/utils'
import { RefineGuard } from 'schemata-ts/schemables/refine/instances/guard'

export const PaddingGuard: WithPadding<G.SchemableLambda> = {
  padLeft: match({
    MaxLength: ({ maxLength }) =>
      RefineGuard.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        'LeftPadding',
      ),
    ExactLength: ({ exactLength }) =>
      RefineGuard.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        'LeftPadding',
      ),
  }),
  padRight: match({
    MaxLength: ({ maxLength }) =>
      RefineGuard.refine(
        (s: string): s is string => s.length <= foldUnion(maxLength)(s),
        'RightPadding',
      ),
    ExactLength: ({ exactLength }) =>
      RefineGuard.refine(
        (s: string): s is string => s.length === foldUnion(exactLength)(s),
        'RightPadding',
      ),
  }),
}

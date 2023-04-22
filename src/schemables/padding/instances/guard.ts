import * as G from 'schemata-ts/internal/guard'
import { WithPadding } from 'schemata-ts/schemables/padding/definition'
import { foldUnion, match } from 'schemata-ts/schemables/padding/utils'

export const PaddingGuard: WithPadding<G.SchemableLambda> = {
  padLeft: match({
    MaxLength: ({ maxLength }) =>
      G.refine((s: string): s is string => s.length <= foldUnion(maxLength)(s)),
    ExactLength: ({ exactLength }) =>
      G.refine((s: string): s is string => s.length === foldUnion(exactLength)(s)),
  }),
  padRight: match({
    MaxLength: ({ maxLength }) =>
      G.refine((s: string): s is string => s.length <= foldUnion(maxLength)(s)),
    ExactLength: ({ exactLength }) =>
      G.refine((s: string): s is string => s.length === foldUnion(exactLength)(s)),
  }),
}

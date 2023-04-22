import * as P from 'schemata-ts/Printer'
import { WithPadding } from 'schemata-ts/schemables/padding/definition'
import { foldUnion, match } from 'schemata-ts/schemables/padding/utils'
import { Printer as WithRefine } from 'schemata-ts/schemables/refine/instances/printer'

export const WithPaddingPrinter: WithPadding<P.SchemableLambda> = {
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

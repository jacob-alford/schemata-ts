import { identity } from 'fp-ts/function'
import type * as Eq from 'schemata-ts/internal/eq'
import { type WithPadding } from 'schemata-ts/schemables/padding/definition'

export const PaddingEq: WithPadding<Eq.SchemableLambda> = {
  padLeft: () => identity,
  padRight: () => identity,
}

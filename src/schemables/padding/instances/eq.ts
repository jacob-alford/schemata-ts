import { identity } from 'fp-ts/function'
import * as Eq from 'schemata-ts/internal/eq'
import { WithPadding } from 'schemata-ts/schemables/padding/definition'

export const PaddingEq: WithPadding<Eq.SchemableLambda> = {
  padLeft: () => identity,
  padRight: () => identity,
}

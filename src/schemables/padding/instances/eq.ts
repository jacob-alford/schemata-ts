import { identity } from 'fp-ts/function'
import * as Eq_ from 'schemata-ts/Eq'
import { WithPadding } from 'schemata-ts/schemables/padding/definition'

export const WithPaddingEq: WithPadding<Eq_.SchemableLambda> = {
  padLeft: () => identity,
  padRight: () => identity,
}

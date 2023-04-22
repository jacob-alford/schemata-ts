import { identity } from 'fp-ts/function'
import * as Enc from 'schemata-ts/Encoder'
import { WithPadding } from 'schemata-ts/schemables/padding/definition'

export const WithPaddingEncoder: WithPadding<Enc.SchemableLambda> = {
  padLeft: () => identity,
  padRight: () => identity,
}

import { identity } from 'fp-ts/function'
import * as JS from 'schemata-ts/internal/json-schema'
import { WithInvariant } from 'schemata-ts/schemables/invariant/definition'

export const WithInvariantJsonSchema: WithInvariant<JS.SchemableLambda> = {
  imap: () => () => identity,
}

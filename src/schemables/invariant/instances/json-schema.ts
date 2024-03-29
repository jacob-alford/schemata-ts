import { identity } from 'fp-ts/function'
import type * as JS from 'schemata-ts/internal/json-schema'
import { type WithInvariant } from 'schemata-ts/schemables/invariant/definition'

export const InvariantJsonSchema: WithInvariant<JS.SchemableLambda> = {
  imap: () => () => identity,
}

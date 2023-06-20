import { constant, identity, unsafeCoerce } from 'fp-ts/function'
import type * as Inf from 'schemata-ts/internal/information'
import { type WithInvariant } from 'schemata-ts/schemables/invariant/definition'

export const InvariantInformation: WithInvariant<Inf.SchemableLambda> = {
  imap: constant(constant(unsafeCoerce(identity))),
}

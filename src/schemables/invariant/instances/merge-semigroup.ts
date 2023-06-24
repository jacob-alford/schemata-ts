import * as MSg from 'schemata-ts/internal/merge-semigroup'
import { type WithInvariant } from 'schemata-ts/schemables/invariant/definition'

export const InvariantMergeSemigroup: WithInvariant<MSg.SchemableLambda> = {
  imap: () => (get, reverseGet) => msgA =>
    MSg.makeMergeSemigroup(
      concrete => (x, y) =>
        get(msgA.semigroup(concrete).concat(reverseGet(x), reverseGet(y))),
    ),
}

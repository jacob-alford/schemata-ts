import type * as Eq from 'schemata-ts/internal/eq'
import { type WithInvariant } from 'schemata-ts/schemables/invariant/definition'

export const InvariantEq: WithInvariant<Eq.SchemableLambda> = {
  imap: () => (_, reverseGet) => eqA => ({
    equals: (x, y) => eqA.equals(reverseGet(x), reverseGet(y)),
  }),
}

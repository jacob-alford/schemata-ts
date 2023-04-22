import * as Eq_ from 'schemata-ts/Eq'
import { WithInvariant } from 'schemata-ts/schemables/invariant/definition'

export const InvariantEq: WithInvariant<Eq_.SchemableLambda> = {
  imap: () => (_, reverseGet) => eqA => ({
    equals: (x, y) => eqA.equals(reverseGet(x), reverseGet(y)),
  }),
}

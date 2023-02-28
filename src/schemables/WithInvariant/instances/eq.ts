import * as Eq_ from 'schemata-ts/Eq'
import { WithInvariant } from 'schemata-ts/schemables/WithInvariant/definition'

export const WithInvariantEq: WithInvariant<Eq_.SchemableLambda> = {
  imap: () => (_, reverseGet) => eqA => ({
    equals: (x, y) => eqA.equals(reverseGet(x), reverseGet(y)),
  }),
}

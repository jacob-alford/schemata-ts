import { flow } from 'fp-ts/function'
import * as Enc from 'schemata-ts/Encoder'
import { WithInvariant } from 'schemata-ts/schemables/WithInvariant/definition'

export const WithInvariantEncoder: WithInvariant<Enc.SchemableLambda> = {
  imap: () => (_, reverseGet) => encA => ({
    encode: flow(reverseGet, encA.encode),
  }),
}

import { flow } from 'fp-ts/function'
import * as P from 'schemata-ts/Printer'
import { WithInvariant } from 'schemata-ts/schemables/WithInvariant/definition'

export const WithInvariantPrinter: WithInvariant<P.SchemableLambda> = {
  imap: () => (_, reverseGet) => printA => ({
    domainToJson: flow(reverseGet, printA.domainToJson),
    codomainToJson: printA.codomainToJson,
  }),
}

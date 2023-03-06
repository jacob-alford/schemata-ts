/**
 * Invariant mapping for schemable
 *
 * @since 1.1.0
 */
import { flow } from 'fp-ts/function'
import * as P from 'schemata-ts/Printer'
import { WithInvariant } from 'schemata-ts/schemables/WithInvariant/definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithInvariant<P.SchemableLambda> = {
  imap: () => (_, reverseGet) => printA => ({
    domainToJson: flow(reverseGet, printA.domainToJson),
    codomainToJson: printA.codomainToJson,
  }),
}

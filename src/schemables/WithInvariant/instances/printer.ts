/**
 * Invariant mapping for schemable
 *
 * @since 1.1.0
 */
import { flow } from 'fp-ts/function'
import * as P from 'schemata-ts/base/PrinterBase'
import { WithInvariant2 } from 'schemata-ts/schemables/WithInvariant/definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithInvariant2<P.URI> = {
  imap: () => (_, reverseGet) => printA => ({
    domainToJson: flow(reverseGet, printA.domainToJson),
    codomainToJson: printA.codomainToJson,
  }),
}

/**
 * Invariant mapping for schemable
 *
 * @since 1.0.2
 */
import { flow } from 'fp-ts/function'

import * as P from '../../../base/PrinterBase'
import { WithInvariant2 } from '../definition'

/**
 * @since 1.0.2
 * @category Instances
 */
export const Printer: WithInvariant2<P.URI> = {
  imap: () => (_, reverseGet) => printA => ({
    print: flow(reverseGet, printA.print),
    printLeft: printA.printLeft,
  }),
}

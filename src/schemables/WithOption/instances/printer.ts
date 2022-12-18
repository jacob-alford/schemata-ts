/**
 * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
 * Requires an inner schemable, and an Eq instance which defaults to strict equality.
 *
 * @since 1.1.0
 */
import * as Eq from 'fp-ts/Eq'
import { flow } from 'fp-ts/function'
import * as O from 'fp-ts/Option'

import * as P from '../../../base/PrinterBase'
import { WithOption2 } from '../definition'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithOption2<P.URI> = {
  optionFromExclude: (exclude, sa, eq = Eq.eqStrict) => ({
    print: flow(
      O.getOrElseW(() => exclude),
      sa.print,
    ),
    printLeft: eb =>
      eq.equals(eb, exclude) ? sa.print(exclude) : sa.printLeft(eb as any),
  }),
}

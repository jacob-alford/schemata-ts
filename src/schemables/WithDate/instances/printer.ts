/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'

import * as P from '../../../base/PrinterBase'
import * as PE from '../../../PrintingError'
import { WithDate2 } from '../definition'
import { isSafeDate, isValidDateString } from '../utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Printer: WithDate2<P.URI> = {
  date: {
    print: flow(
      E.fromPredicate(
        isSafeDate,
        () => new PE.Message('Invalid Date', new PE.NotANumber()),
      ),
      E.map(d => d.toISOString()),
    ),
    printLeft: flow(
      E.fromPredicate(
        isSafeDate,
        () => new PE.Message('Invalid Date', new PE.NotANumber()),
      ),
      E.map(d => d.toISOString()),
    ),
  },
  dateFromString: {
    print: flow(
      E.fromPredicate(
        isSafeDate,
        () => new PE.Message('Invalid Date', new PE.NotANumber()),
      ),
      E.map(d => d.toISOString()),
    ),
    printLeft: E.fromPredicate(
      isValidDateString,
      () => new PE.Message('Invalid Date', new PE.NotANumber()),
    ),
  },
}

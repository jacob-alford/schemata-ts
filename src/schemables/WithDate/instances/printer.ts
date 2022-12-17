/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import * as P from '../../../base/PrinterBase'
import * as PE from '../../../PrintingError'
import { WithDate2 } from '../definition'
import { isSafeDate } from '../utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Printer: WithDate2<P.URI> = {
  date: {
    print: date =>
      pipe(
        date,
        E.fromPredicate(
          isSafeDate,
          () => new PE.NamedError('Valid Date', new PE.InvalidValue(date)),
        ),
        E.map(d => d.toISOString()),
      ),
    printLeft: date =>
      pipe(
        date,
        E.fromPredicate(
          isSafeDate,
          () => new PE.NamedError('Valid Date', new PE.InvalidValue(date)),
        ),
        E.map(d => d.toISOString()),
      ),
  },
  dateFromString: {
    print: date =>
      pipe(
        date,
        E.fromPredicate(
          isSafeDate,
          () => new PE.NamedError('Valid Date', new PE.InvalidValue(date)),
        ),
        E.map(d => d.toISOString()),
      ),
    printLeft: P.string.printLeft,
  },
}

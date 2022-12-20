/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.1.0
 */
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import * as P from '../../../base/PrinterBase'
import * as PE from '../../../PrintError'
import { WithDate2 } from '../definition'
import { isSafeDate } from '../utils'

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithDate2<P.URI> = {
  date: {
    domainToJson: date =>
      pipe(
        date,
        E.fromPredicate(
          isSafeDate,
          () => new PE.NamedError('Valid Date', new PE.InvalidValue(date)),
        ),
        E.map(d => d.toISOString()),
      ),
    codomainToJson: date =>
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
    domainToJson: date =>
      pipe(
        date,
        E.fromPredicate(
          isSafeDate,
          () => new PE.NamedError('Valid Date', new PE.InvalidValue(date)),
        ),
        E.map(d => d.toISOString()),
      ),
    codomainToJson: P.string.codomainToJson,
  },
}

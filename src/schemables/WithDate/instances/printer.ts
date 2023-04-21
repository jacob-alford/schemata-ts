import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as P from 'schemata-ts/Printer'
import * as PE from 'schemata-ts/PrintError'
import { WithDate } from 'schemata-ts/schemables/WithDate/definition'
import { isSafeDate } from 'schemata-ts/schemables/WithDate/utils'

export const WithDatePrinter: WithDate<P.SchemableLambda> = {
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

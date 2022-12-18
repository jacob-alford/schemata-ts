/**
 * A basal schemable for Json and JsonString
 *
 * @since 1.1.0
 */
import * as E from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'
import * as J from 'fp-ts/Json'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RR from 'fp-ts/ReadonlyRecord'

import * as P from '../../../base/PrinterBase'
import * as PE from '../../../PrintingError'
import { WithJson2 } from '../definition'

const safePrintJson = (input: J.Json): E.Either<PE.PrintingError, J.Json> => {
  if (Array.isArray(input)) {
    return pipe(
      input,
      RA.traverseWithIndex(P.printerValidation)((i, val) =>
        pipe(
          val,
          E.fromPredicate(
            val => val !== input,
            value => new PE.CircularReference(value),
          ),
          E.chain(safePrintJson),
          E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
        ),
      ),
    )
  }
  if (typeof input === 'object' && input !== null) {
    return pipe(
      input as Readonly<Record<string, J.Json>>,
      RR.traverseWithIndex(P.printerValidation)((key, val) =>
        pipe(
          val,
          E.fromPredicate(
            val => val !== input,
            value => new PE.CircularReference(value),
          ),
          E.chain(safePrintJson),
          E.mapLeft(err => new PE.ErrorAtKey(key, err)),
        ),
      ),
    )
  }
  return P.toJson(input)
}

/**
 * @since 1.1.0
 * @category Instances
 */
export const Printer: WithJson2<P.URI> = {
  json: {
    print: safePrintJson,
    printLeft: safePrintJson,
  },
  jsonString: {
    print: flow(
      J.parse,
      E.mapLeft(err => new PE.NamedError('Json String', new PE.UnknownError(err))),
      E.chain(safePrintJson),
    ),
    printLeft: P.string.printLeft,
  },
}

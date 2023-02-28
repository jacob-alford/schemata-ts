import * as E from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as P from 'schemata-ts/Printer'
import * as PE from 'schemata-ts/PrintError'
import { WithArray } from 'schemata-ts/schemables/WithArray/definition'

export const WithArrayPrinter: WithArray<P.SchemableLambda> = {
  array: item => ({
    domainToJson: flow(
      RA.traverseWithIndex(P.printerValidation)((i, a) =>
        pipe(
          item.domainToJson(a),
          E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
        ),
      ),
      E.map(P.safeJsonArray),
    ),
    codomainToJson: flow(
      RA.traverseWithIndex(P.printerValidation)((i, a) =>
        pipe(
          item.codomainToJson(a),
          E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
        ),
      ),
      E.map(P.safeJsonArray),
    ),
  }),
  tuple: (...components) => ({
    domainToJson: input =>
      pipe(
        RA.zipWith(components, input, (printer, a) => printer.domainToJson(a)),
        RA.traverseWithIndex(P.printerValidation)((i, a) =>
          pipe(
            a,
            E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
          ),
        ),
        E.map(P.safeJsonArray),
      ),
    codomainToJson: input =>
      pipe(
        RA.zipWith(components, input, (printer, b) => printer.codomainToJson(b)),
        RA.traverseWithIndex(P.printerValidation)((i, a) =>
          pipe(
            a,
            E.mapLeft(err => new PE.ErrorAtIndex(i, err)),
          ),
        ),
        E.map(P.safeJsonArray),
      ),
  }),
}

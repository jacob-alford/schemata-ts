import { apS } from 'fp-ts/Apply'
import * as E from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RM from 'fp-ts/ReadonlyMap'
import * as P from 'schemata-ts/Printer'
import * as PE from 'schemata-ts/PrintError'
import { WithMap } from 'schemata-ts/schemables/map/definition'

const apSV = apS(P.printerValidation)

export const WithMapPrinter: WithMap<P.SchemableLambda> = {
  mapFromEntries: (ordK, sk, sa) => ({
    domainToJson: flow(
      RM.toReadonlyArray(ordK),
      RA.traverseWithIndex(P.printerValidation)((i, [k, a]) =>
        pipe(
          E.Do,
          apSV(
            'k',
            pipe(
              sk.domainToJson(k),
              E.mapLeft(err => new PE.ErrorAtIndex(0, err)),
            ),
          ),
          apSV(
            'a',
            pipe(
              sa.domainToJson(a),
              E.mapLeft(err => new PE.ErrorAtIndex(1, err)),
            ),
          ),
          E.bimap(
            err => new PE.ErrorAtIndex(i, err),
            ({ k, a }) => P.safeJsonArray([k, a]),
          ),
        ),
      ),
      E.map(P.safeJsonArray),
    ),
    codomainToJson: flow(
      RA.traverseWithIndex(P.printerValidation)((i, [k, a]) =>
        pipe(
          E.Do,
          apSV(
            'k',
            pipe(
              sk.codomainToJson(k),
              E.mapLeft(err => new PE.ErrorAtIndex(0, err)),
            ),
          ),
          apSV(
            'a',
            pipe(
              sa.codomainToJson(a),
              E.mapLeft(err => new PE.ErrorAtIndex(1, err)),
            ),
          ),
          E.bimap(
            err => new PE.ErrorAtIndex(i, err),
            ({ k, a }) => P.safeJsonArray([k, a]),
          ),
        ),
      ),
      E.map(P.safeJsonArray),
    ),
  }),
}

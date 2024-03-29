import * as E from 'fp-ts/Either'
import { identity, pipe, unsafeCoerce } from 'fp-ts/function'
import * as Pred from 'fp-ts/Predicate'
import * as TC from 'schemata-ts/internal/transcoder'
import { type WithDate } from 'schemata-ts/schemables/date/definition'
import { DateGuard as Guard } from 'schemata-ts/schemables/date/instances/guard'
import {
  earliestSafeDate,
  getDateBoundsStr,
  isAfterInc,
  isBeforeInc,
  isValidDateString,
  latestSafeDate,
} from 'schemata-ts/schemables/date/utils'

export const DateTranscoder: WithDate<TC.SchemableLambda> = {
  date: params =>
    pipe(
      Guard.date(params),
      TC.fromGuard(identity, u =>
        TC.transcodeErrors(TC.typeMismatch(`Date${getDateBoundsStr(params)}`, u)),
      ),
    ),
  dateFromString: (params = {}) => {
    const { beforeDate = latestSafeDate, afterDate = earliestSafeDate } = params
    return {
      encode: date => E.right(unsafeCoerce(date.toISOString())),
      decode: u =>
        pipe(
          u,
          E.fromPredicate(isValidDateString, () =>
            TC.transcodeErrors(
              TC.typeMismatch(`DateString${getDateBoundsStr(params)}`, u),
            ),
          ),
          E.map(ds => new Date(ds)),
          E.filterOrElse(Pred.and(isBeforeInc(afterDate))(isAfterInc(beforeDate)), () =>
            TC.transcodeErrors(
              TC.typeMismatch(`DateString${getDateBoundsStr(params)}`, u),
            ),
          ),
          E.map(_ => unsafeCoerce(_)),
        ),
    }
  },
}

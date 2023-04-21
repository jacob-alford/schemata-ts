import { pipe } from 'fp-ts/function'
import * as TC from 'schemata-ts/internal/Transcoder'
import { WithDate } from 'schemata-ts/schemables/WithDate/definition'
import { Guard } from 'schemata-ts/schemables/WithDate/instances/guard'
import { isValidDateString } from 'schemata-ts/schemables/WithDate/utils'

export const WithDateTranscoder: WithDate<TC.SchemableLambda> = {
  date: pipe(
    Guard.date,
    D.fromGuard(u => TC.decodeErrors(TC.typeMismatch('Date', u))),
  ),
  dateFromString: pipe(
    D.fromPredicate(isValidDateString, u =>
      TC.decodeErrors(TC.typeMismatch(String(u), 'Date.dateFromString')),
    ),
    D.map(d => new Date(d)),
  ),
}

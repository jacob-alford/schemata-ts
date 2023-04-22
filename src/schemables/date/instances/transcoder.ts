import { identity, pipe } from 'fp-ts/function'
import * as TC from 'schemata-ts/internal/transcoder'
import { WithDate } from 'schemata-ts/schemables/date/definition'
import { DateGuard as Guard } from 'schemata-ts/schemables/date/instances/guard'
import { isValidDateString } from 'schemata-ts/schemables/date/utils'

export const DateTranscoder: WithDate<TC.SchemableLambda> = {
  date: pipe(
    Guard.date,
    TC.fromGuard(identity, u => TC.transcodeErrors(TC.typeMismatch('Date', u))),
  ),
  dateFromString: pipe(
    TC.fromPredicate(isValidDateString, identity, u =>
      TC.transcodeErrors(TC.typeMismatch(String(u), 'Date.dateFromString')),
    ),
    TC.imap(
      d => new Date(d),
      d => d.toISOString(),
    ),
  ),
}

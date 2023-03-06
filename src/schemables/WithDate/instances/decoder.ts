/**
 * Represents valid Date objects, and valid date-strings parsable by `Date.parse`
 *
 * @since 1.0.0
 */
import { pipe } from 'fp-ts/function'
import * as D from 'schemata-ts/Decoder'
import { WithDate } from 'schemata-ts/schemables/WithDate/definition'
import { Guard } from 'schemata-ts/schemables/WithDate/instances/guard'
import { isValidDateString } from 'schemata-ts/schemables/WithDate/utils'

/**
 * @since 1.0.0
 * @category Instances
 */
export const Decoder: WithDate<D.SchemableLambda> = {
  date: pipe(
    Guard.date,
    D.fromGuard(u => D.liftDecodeError(D.typeMismatch('Date', u))),
  ),
  dateFromString: pipe(
    D.fromPredicate(isValidDateString, u =>
      D.liftDecodeError<string>(D.typeMismatch(String(u), 'Date.dateFromString')),
    ),
    D.map(d => new Date(d)),
  ),
}

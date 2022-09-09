/**
 * SchemableExt intstances for TaskDecoder
 *
 * @since 0.0.1
 */
import * as TD from 'io-ts/TaskDecoder'
import { SchemableExt2C } from './SchemableExt'

/* number */
import * as Int from './number/Int'
import * as NegativeInt from './number/NegativeInt'
import * as PositiveInt from './number/PositiveInt'

/* string */
import * as IsoDate from './string/ISODateString'

/* date */
import * as SafeDate from './date/SafeDate'

/**
 * @since 0.0.1
 * @category Instances
 */
export const Schemable: SchemableExt2C<TD.URI> = {
  ...TD.Schemable,
  /* number */
  Int: Int.TaskDecoder,
  NegativeInt: NegativeInt.TaskDecoder,
  PositiveInt: PositiveInt.TaskDecoder,

  /* string */
  ISODate: IsoDate.TaskDecoder,

  /* date */
  SafeDate: SafeDate.TaskDecoder,
}

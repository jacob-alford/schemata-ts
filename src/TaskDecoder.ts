/**
 * SchemableExt intstances for TaskDecoder
 *
 * @since 0.0.1
 */
import * as TD from 'io-ts/TaskDecoder'
import { SchemableExt2C } from './SchemableExt'

/* number */
import { TaskDecoder as IntTaskDecoder } from './number/int'
import { TaskDecoder as NegativeIntTaskDecoder } from './number/negativeInt'
import { TaskDecoder as PositiveIntTaskDecoder } from './number/positiveInt'

/* string */
import { TaskDecoder as IsoDateTaskDecoder } from './string/isoDateString'

/* date */
import { TaskDecoder as SafeDateTaskDecoder } from './date/safeDate'

/**
 * @since 0.0.1
 * @category Instances
 */
export const Schemable: SchemableExt2C<TD.URI> = {
  ...TD.Schemable,
  /* number */
  Int: IntTaskDecoder,
  NegativeInt: NegativeIntTaskDecoder,
  PositiveInt: PositiveIntTaskDecoder,

  /* string */
  ISODate: IsoDateTaskDecoder,

  /* date */
  SafeDate: SafeDateTaskDecoder,
}

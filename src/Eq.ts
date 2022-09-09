/**
 * SchemableExt intstances for Eq
 *
 * @since 0.0.1
 */
import * as Eq from 'io-ts/Eq'
import { SchemableExt1 } from './SchemableExt'

/* number */
import * as Int from './number/Int'
import * as NegativeInt from './number/NegativeInt'
import * as PositiveInt from './number/PositiveInt'

/* string */
import * as ISODate from './string/ISODateString'

/* date */
import * as SafeDate from './date/SafeDate'

/**
 * @since 0.0.1
 * @category Instances
 */
export const Schemable: SchemableExt1<Eq.URI> = {
  ...Eq.Schemable,
  /* number */
  Int: Int.Eq,
  NegativeInt: NegativeInt.Eq,
  PositiveInt: PositiveInt.Eq,

  /* string */
  ISODate: ISODate.Eq,

  /* date */
  SafeDate: SafeDate.Eq,
}

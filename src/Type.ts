/**
 * SchemableExt intstances for Type
 *
 * @since 0.0.1
 */
import * as t from 'io-ts/Type'
import { SchemableExt1 } from './SchemableExt'

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
export const Schemable: SchemableExt1<t.URI> = {
  ...t.Schemable,
  /* number */
  Int: Int.Type,
  NegativeInt: NegativeInt.Type,
  PositiveInt: PositiveInt.Type,

  /* string */
  ISODate: IsoDate.Type,

  /* date */
  SafeDate: SafeDate.Type,
}

/**
 * SchemableExt intstances for Guard
 *
 * @since 0.0.1
 */
import * as G from 'io-ts/Guard'
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
export const Schemable: SchemableExt1<G.URI> = {
  ...G.Schemable,
  /* number */
  Int: Int.Guard,
  NegativeInt: NegativeInt.Guard,
  PositiveInt: PositiveInt.Guard,

  /* string */
  ISODate: IsoDate.Guard,

  /* date */
  SafeDate: SafeDate.Guard,
}

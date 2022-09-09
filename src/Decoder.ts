/**
 * SchemableExt intstances for Decoder
 *
 * @since 0.0.1
 */
import * as D from 'io-ts/Decoder'
import { SchemableExt2C } from './SchemableExt'

/* number */
import * as Int from './number/Int'
import * as NegativeInt from './number/NegativeInt'
import * as PositiveInt from './number/PositiveInt'

/* string */
import * as ISODateString from './string/ISODateString'

/* date */
import * as SafeDate from './date/SafeDate'

/**
 * @since 0.0.1
 * @category Instances
 */
export const Schemable: SchemableExt2C<D.URI> = {
  ...D.Schemable,
  /* number */
  Int: Int.Decoder,
  NegativeInt: NegativeInt.Decoder,
  PositiveInt: PositiveInt.Decoder,

  /* string */
  ISODate: ISODateString.Decoder,

  /* date */
  SafeDate: SafeDate.Decoder,
}

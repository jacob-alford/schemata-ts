/**
 * SchemableExt instances for Decoder
 *
 * **Warning: DO NOT EDIT, this module is autogenerated**
 *
 * @since 0.0.1
 */
import * as D from 'io-ts/Decoder'
import { SchemableExt2C } from './SchemableExt'

/** Number */
import * as Int from './number/Int'
import * as Natural from './number/Natural'
import * as NegativeInt from './number/NegativeInt'
import * as PositiveInt from './number/PositiveInt'

/** String */
import * as EmailAddress from './string/EmailAddress'
import * as ISODateString from './string/ISODateString'
import * as IntString from './string/IntString'
import * as NaturalString from './string/NaturalString'
import * as NegativeIntString from './string/NegativeIntString'
import * as NonemptyString from './string/NonemptyString'
import * as PositiveIntString from './string/PositiveIntString'
import * as UUID from './string/UUID'

/** Date */
import * as SafeDate from './date/SafeDate'

/**
 * @since 0.0.1
 * @category Instances
 */
export const Schemable: SchemableExt2C<D.URI> = {
  ...D.Schemable,
  Int: Int.Decoder,
  Natural: Natural.Decoder,
  NegativeInt: NegativeInt.Decoder,
  PositiveInt: PositiveInt.Decoder,
  EmailAddress: EmailAddress.Decoder,
  ISODateString: ISODateString.Decoder,
  IntString: IntString.Decoder,
  NaturalString: NaturalString.Decoder,
  NegativeIntString: NegativeIntString.Decoder,
  NonemptyString: NonemptyString.Decoder,
  PositiveIntString: PositiveIntString.Decoder,
  UUID: UUID.Decoder,
  SafeDate: SafeDate.Decoder,
}

/**
 * SchemableExt instances for Eq
 *
 * **Warning: DO NOT EDIT, this module is autogenerated**
 *
 * @since 0.0.1
 */
import * as Eq from 'io-ts/Eq'
import { SchemableExt1 } from './SchemableExt'

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
export const Schemable: SchemableExt1<Eq.URI> = {
  ...Eq.Schemable,
  Int: Int.Eq,
  Natural: Natural.Eq,
  NegativeInt: NegativeInt.Eq,
  PositiveInt: PositiveInt.Eq,
  EmailAddress: EmailAddress.Eq,
  ISODateString: ISODateString.Eq,
  IntString: IntString.Eq,
  NaturalString: NaturalString.Eq,
  NegativeIntString: NegativeIntString.Eq,
  NonemptyString: NonemptyString.Eq,
  PositiveIntString: PositiveIntString.Eq,
  UUID: UUID.Eq,
  SafeDate: SafeDate.Eq,
}

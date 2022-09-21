/**
 * SchemableExt instances for Guard
 *
 * **Warning: DO NOT EDIT, this module is autogenerated**
 *
 * @since 0.0.1
 */
import * as G from 'io-ts/Guard'
import { SchemableExt1 } from './SchemableExt'

/** Number */
import * as Int from './number/Int'
import * as Natural from './number/Natural'
import * as NegativeFloat from './number/NegativeFloat'
import * as NegativeInt from './number/NegativeInt'
import * as NonNegativeFloat from './number/NonNegativeFloat'
import * as PositiveFloat from './number/PositiveFloat'
import * as PositiveInt from './number/PositiveInt'

/** String */
import * as ASCII from './string/ASCII'
import * as Base64 from './string/Base64'
import * as Base64Url from './string/Base64Url'
import * as BtcAddress from './string/BtcAddress'
import * as EmailAddress from './string/EmailAddress'
import * as ISODateString from './string/ISODateString'
import * as IntString from './string/IntString'
import * as JWT from './string/JWT'
import * as NaturalString from './string/NaturalString'
import * as NegativeFloatString from './string/NegativeFloatString'
import * as NegativeIntString from './string/NegativeIntString'
import * as NonNegativeFloatString from './string/NonNegativeFloatString'
import * as NonemptyString from './string/NonemptyString'
import * as PositiveFloatString from './string/PositiveFloatString'
import * as PositiveIntString from './string/PositiveIntString'
import * as UUID from './string/UUID'

/** Date */
import * as SafeDate from './date/SafeDate'

/**
 * @since 0.0.1
 * @category Instances
 */
export const Schemable: SchemableExt1<G.URI> = {
  ...G.Schemable,
  Int: Int.Guard,
  Natural: Natural.Guard,
  NegativeFloat: NegativeFloat.Guard,
  NegativeInt: NegativeInt.Guard,
  NonNegativeFloat: NonNegativeFloat.Guard,
  PositiveFloat: PositiveFloat.Guard,
  PositiveInt: PositiveInt.Guard,
  ASCII: ASCII.Guard,
  Base64: Base64.Guard,
  Base64Url: Base64Url.Guard,
  BtcAddress: BtcAddress.Guard,
  EmailAddress: EmailAddress.Guard,
  ISODateString: ISODateString.Guard,
  IntString: IntString.Guard,
  JWT: JWT.Guard,
  NaturalString: NaturalString.Guard,
  NegativeFloatString: NegativeFloatString.Guard,
  NegativeIntString: NegativeIntString.Guard,
  NonNegativeFloatString: NonNegativeFloatString.Guard,
  NonemptyString: NonemptyString.Guard,
  PositiveFloatString: PositiveFloatString.Guard,
  PositiveIntString: PositiveIntString.Guard,
  UUID: UUID.Guard,
  SafeDate: SafeDate.Guard,
}

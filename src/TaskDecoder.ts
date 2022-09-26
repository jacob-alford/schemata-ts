/**
 * SchemableExt instances for TaskDecoder
 *
 * **Warning: DO NOT EDIT, this module is autogenerated**
 *
 * @since 0.0.1
 */
import * as TD from 'io-ts/TaskDecoder'
import { SchemableExt2C } from './SchemableExt'

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
import * as CreditCard from './string/CreditCard'
import * as EmailAddress from './string/EmailAddress'
import * as HexColor from './string/HexColor'
import * as Hexadecimal from './string/Hexadecimal'
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
export const Schemable: SchemableExt2C<TD.URI> = {
  ...TD.Schemable,
  Int: Int.TaskDecoder,
  Natural: Natural.TaskDecoder,
  NegativeFloat: NegativeFloat.TaskDecoder,
  NegativeInt: NegativeInt.TaskDecoder,
  NonNegativeFloat: NonNegativeFloat.TaskDecoder,
  PositiveFloat: PositiveFloat.TaskDecoder,
  PositiveInt: PositiveInt.TaskDecoder,
  ASCII: ASCII.TaskDecoder,
  Base64: Base64.TaskDecoder,
  Base64Url: Base64Url.TaskDecoder,
  BtcAddress: BtcAddress.TaskDecoder,
  CreditCard: CreditCard.TaskDecoder,
  EmailAddress: EmailAddress.TaskDecoder,
  HexColor: HexColor.TaskDecoder,
  Hexadecimal: Hexadecimal.TaskDecoder,
  ISODateString: ISODateString.TaskDecoder,
  IntString: IntString.TaskDecoder,
  JWT: JWT.TaskDecoder,
  NaturalString: NaturalString.TaskDecoder,
  NegativeFloatString: NegativeFloatString.TaskDecoder,
  NegativeIntString: NegativeIntString.TaskDecoder,
  NonNegativeFloatString: NonNegativeFloatString.TaskDecoder,
  NonemptyString: NonemptyString.TaskDecoder,
  PositiveFloatString: PositiveFloatString.TaskDecoder,
  PositiveIntString: PositiveIntString.TaskDecoder,
  UUID: UUID.TaskDecoder,
  SafeDate: SafeDate.TaskDecoder,
}

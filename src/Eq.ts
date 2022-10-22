/**
 * SchemableExt instances for Eq
 *
 * **Warning: DO NOT EDIT, this module is autogenerated**
 *
 * @since 0.0.1
 */
import * as Eq from 'io-ts/Eq'
import { SchemableExt1 } from './SchemableExt'

/** Generic */
import * as optionFromExclude from './generic/optionFromExclude'
import * as optionFromNullable from './generic/optionFromNullable'
import * as optionFromUndefined from './generic/optionFromUndefined'

/** Number */
import * as Int from './number/Int'
import * as Natural from './number/Natural'
import * as NegativeFloat from './number/NegativeFloat'
import * as NegativeInt from './number/NegativeInt'
import * as NonNegativeFloat from './number/NonNegativeFloat'
import * as NonPositiveFloat from './number/NonPositiveFloat'
import * as NonPositiveInt from './number/NonPositiveInt'
import * as PositiveFloat from './number/PositiveFloat'
import * as PositiveInt from './number/PositiveInt'

/** String */
import * as ASCII from './string/ASCII'
import * as Base64 from './string/Base64'
import * as Base64Url from './string/Base64Url'
import * as BigIntString from './string/BigIntString'
import * as BtcAddress from './string/BtcAddress'
import * as CreditCard from './string/CreditCard'
import * as EmailAddress from './string/EmailAddress'
import * as HexColor from './string/HexColor'
import * as Hexadecimal from './string/Hexadecimal'
import * as HslColor from './string/HslColor'
import * as ISODateString from './string/ISODateString'
import * as IntString from './string/IntString'
import * as JWT from './string/JWT'
import * as NaturalString from './string/NaturalString'
import * as NegativeFloatString from './string/NegativeFloatString'
import * as NegativeIntString from './string/NegativeIntString'
import * as NonNegativeFloatString from './string/NonNegativeFloatString'
import * as NonPositiveFloatString from './string/NonPositiveFloatString'
import * as NonPositiveIntString from './string/NonPositiveIntString'
import * as NonemptyString from './string/NonemptyString'
import * as PositiveFloatString from './string/PositiveFloatString'
import * as PositiveIntString from './string/PositiveIntString'
import * as RGB from './string/RGB'
import * as UUID from './string/UUID'

/** Date */
import * as SafeDate from './date/SafeDate'

/**
 * @since 0.0.1
 * @category Instances
 */
export const Schemable: SchemableExt1<Eq.URI> = {
  ...Eq.Schemable,
  optionFromExclude: optionFromExclude.Eq,
  optionFromNullable: optionFromNullable.Eq,
  optionFromUndefined: optionFromUndefined.Eq,
  Int: Int.Eq,
  Natural: Natural.Eq,
  NegativeFloat: NegativeFloat.Eq,
  NegativeInt: NegativeInt.Eq,
  NonNegativeFloat: NonNegativeFloat.Eq,
  NonPositiveFloat: NonPositiveFloat.Eq,
  NonPositiveInt: NonPositiveInt.Eq,
  PositiveFloat: PositiveFloat.Eq,
  PositiveInt: PositiveInt.Eq,
  ASCII: ASCII.Eq,
  Base64: Base64.Eq,
  Base64Url: Base64Url.Eq,
  BigIntString: BigIntString.Eq,
  BtcAddress: BtcAddress.Eq,
  CreditCard: CreditCard.Eq,
  EmailAddress: EmailAddress.Eq,
  HexColor: HexColor.Eq,
  Hexadecimal: Hexadecimal.Eq,
  HslColor: HslColor.Eq,
  ISODateString: ISODateString.Eq,
  IntString: IntString.Eq,
  JWT: JWT.Eq,
  NaturalString: NaturalString.Eq,
  NegativeFloatString: NegativeFloatString.Eq,
  NegativeIntString: NegativeIntString.Eq,
  NonNegativeFloatString: NonNegativeFloatString.Eq,
  NonPositiveFloatString: NonPositiveFloatString.Eq,
  NonPositiveIntString: NonPositiveIntString.Eq,
  NonemptyString: NonemptyString.Eq,
  PositiveFloatString: PositiveFloatString.Eq,
  PositiveIntString: PositiveIntString.Eq,
  RGB: RGB.Eq,
  UUID: UUID.Eq,
  SafeDate: SafeDate.Eq,
}

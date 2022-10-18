/**
 * SchemableExt instances for TaskDecoder
 *
 * **Warning: DO NOT EDIT, this module is autogenerated**
 *
 * @since 0.0.1
 */
import * as TD from 'io-ts/TaskDecoder'
import { SchemableExt2C } from './SchemableExt'

/** Generic */
import * as mapFromEntries from './generic/mapFromEntries'
import * as optionFromExclude from './generic/optionFromExclude'
import * as optionFromNullable from './generic/optionFromNullable'
import * as optionFromUndefined from './generic/optionFromUndefined'

/** Number */
import * as int from './number/int'
import * as natural from './number/natural'
import * as negativeFloat from './number/negativeFloat'
import * as negativeInt from './number/negativeInt'
import * as nonNegativeFloat from './number/nonNegativeFloat'
import * as nonPositiveFloat from './number/nonPositiveFloat'
import * as nonPositiveInt from './number/nonPositiveInt'
import * as positiveFloat from './number/positiveFloat'
import * as positiveInt from './number/positiveInt'

/** String */
import * as ascii from './string/ascii'
import * as base64 from './string/base64'
import * as base64Url from './string/base64Url'
import * as bigIntString from './string/bigIntString'
import * as btcAddress from './string/btcAddress'
import * as creditCard from './string/creditCard'
import * as emailAddress from './string/emailAddress'
import * as hexColor from './string/hexColor'
import * as hexadecimal from './string/hexadecimal'
import * as hslColor from './string/hslColor'
import * as intString from './string/intString'
import * as isoDateString from './string/isoDateString'
import * as jwt from './string/jwt'
import * as naturalString from './string/naturalString'
import * as negativeFloatString from './string/negativeFloatString'
import * as negativeIntString from './string/negativeIntString'
import * as nonNegativeFloatString from './string/nonNegativeFloatString'
import * as nonPositiveFloatString from './string/nonPositiveFloatString'
import * as nonPositiveIntString from './string/nonPositiveIntString'
import * as nonemptyString from './string/nonemptyString'
import * as positiveFloatString from './string/positiveFloatString'
import * as positiveIntString from './string/positiveIntString'
import * as rgb from './string/rgb'
import * as uuid from './string/uuid'

/** Date */
import * as safeDate from './date/safeDate'

/**
 * @since 0.0.1
 * @category Instances
 */
export const Schemable: SchemableExt2C<TD.URI> = {
  ...TD.Schemable,
  ...TD.WithUnknownContainers,
  mapFromEntries: mapFromEntries.TaskDecoder,
  optionFromExclude: optionFromExclude.TaskDecoder,
  optionFromNullable: optionFromNullable.TaskDecoder,
  optionFromUndefined: optionFromUndefined.TaskDecoder,
  int: int.TaskDecoder,
  natural: natural.TaskDecoder,
  negativeFloat: negativeFloat.TaskDecoder,
  negativeInt: negativeInt.TaskDecoder,
  nonNegativeFloat: nonNegativeFloat.TaskDecoder,
  nonPositiveFloat: nonPositiveFloat.TaskDecoder,
  nonPositiveInt: nonPositiveInt.TaskDecoder,
  positiveFloat: positiveFloat.TaskDecoder,
  positiveInt: positiveInt.TaskDecoder,
  ascii: ascii.TaskDecoder,
  base64: base64.TaskDecoder,
  base64Url: base64Url.TaskDecoder,
  bigIntString: bigIntString.TaskDecoder,
  btcAddress: btcAddress.TaskDecoder,
  creditCard: creditCard.TaskDecoder,
  emailAddress: emailAddress.TaskDecoder,
  hexColor: hexColor.TaskDecoder,
  hexadecimal: hexadecimal.TaskDecoder,
  hslColor: hslColor.TaskDecoder,
  intString: intString.TaskDecoder,
  isoDateString: isoDateString.TaskDecoder,
  jwt: jwt.TaskDecoder,
  naturalString: naturalString.TaskDecoder,
  negativeFloatString: negativeFloatString.TaskDecoder,
  negativeIntString: negativeIntString.TaskDecoder,
  nonNegativeFloatString: nonNegativeFloatString.TaskDecoder,
  nonPositiveFloatString: nonPositiveFloatString.TaskDecoder,
  nonPositiveIntString: nonPositiveIntString.TaskDecoder,
  nonemptyString: nonemptyString.TaskDecoder,
  positiveFloatString: positiveFloatString.TaskDecoder,
  positiveIntString: positiveIntString.TaskDecoder,
  rgb: rgb.TaskDecoder,
  uuid: uuid.TaskDecoder,
  safeDate: safeDate.TaskDecoder,
}

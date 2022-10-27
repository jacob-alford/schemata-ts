/**
 * SchemableExt instances for Guard
 *
 * **Warning: DO NOT EDIT, this module is autogenerated**
 *
 * @since 0.0.1
 */
import * as G from './internal/GuardBase'
import { SchemableExt1 } from './SchemableExt'

/** Generic */
import * as mapFromEntries from './generic/mapFromEntries'
import * as optionFromExclude from './generic/optionFromExclude'
import * as optionFromNullable from './generic/optionFromNullable'
import * as optionFromUndefined from './generic/optionFromUndefined'

/** Number */
import * as float from './number/float'
import * as floatFromString from './number/floatFromString'
import * as int from './number/int'
import * as intFromString from './number/intFromString'

/** String */
import * as ascii from './string/ascii'
import * as base64 from './string/base64'
import * as base64Url from './string/base64Url'
import * as bigIntString from './string/bigIntString'
import * as btcAddress from './string/btcAddress'
import * as creditCard from './string/creditCard'
import * as emailAddress from './string/emailAddress'
import * as hexColor from './string/hexColor'
import * as hslColor from './string/hslColor'
import * as isoDateString from './string/isoDateString'
import * as jwt from './string/jwt'
import * as latLong from './string/latLong'
import * as nonemptyString from './string/nonemptyString'
import * as rgb from './string/rgb'
import * as uuid from './string/uuid'

/** Date */
import * as safeDate from './date/safeDate'

/**
 * @since 0.0.1
 * @category Instances
 */
export const Schemable: SchemableExt1<G.URI> = {
  ...G.Schemable,
  ...G.WithBrand,
  ...G.WithPattern,
  ...G.WithRefine,
  ...G.WithUnknownContainers,
  mapFromEntries: mapFromEntries.Guard,
  optionFromExclude: optionFromExclude.Guard,
  optionFromNullable: optionFromNullable.Guard,
  optionFromUndefined: optionFromUndefined.Guard,
  float: float.Guard,
  floatFromString: floatFromString.Guard,
  int: int.Guard,
  intFromString: intFromString.Guard,
  ascii: ascii.Guard,
  base64: base64.Guard,
  base64Url: base64Url.Guard,
  bigIntString: bigIntString.Guard,
  btcAddress: btcAddress.Guard,
  creditCard: creditCard.Guard,
  emailAddress: emailAddress.Guard,
  hexColor: hexColor.Guard,
  hslColor: hslColor.Guard,
  isoDateString: isoDateString.Guard,
  jwt: jwt.Guard,
  latLong: latLong.Guard,
  nonemptyString: nonemptyString.Guard,
  rgb: rgb.Guard,
  uuid: uuid.Guard,
  safeDate: safeDate.Guard,
}

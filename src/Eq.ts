/**
 * SchemableExt instances for Eq
 *
 * **Warning: DO NOT EDIT, this module is autogenerated**
 *
 * @since 0.0.1
 */
import * as Eq from './internal/EqBase'
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
import * as base64 from './string/base64'
import * as base64Url from './string/base64Url'
import * as bigIntString from './string/bigIntString'
import * as btcAddress from './string/btcAddress'
import * as creditCard from './string/creditCard'
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
export const Schemable: SchemableExt1<Eq.URI> = {
  ...Eq.Schemable,
  ...Eq.WithBrand,
  ...Eq.WithPattern,
  ...Eq.WithRefine,
  ...Eq.WithUnknownContainers,
  mapFromEntries: mapFromEntries.Eq,
  optionFromExclude: optionFromExclude.Eq,
  optionFromNullable: optionFromNullable.Eq,
  optionFromUndefined: optionFromUndefined.Eq,
  float: float.Eq,
  floatFromString: floatFromString.Eq,
  int: int.Eq,
  intFromString: intFromString.Eq,
  base64: base64.Eq,
  base64Url: base64Url.Eq,
  bigIntString: bigIntString.Eq,
  btcAddress: btcAddress.Eq,
  creditCard: creditCard.Eq,
  hexColor: hexColor.Eq,
  hslColor: hslColor.Eq,
  isoDateString: isoDateString.Eq,
  jwt: jwt.Eq,
  latLong: latLong.Eq,
  nonemptyString: nonemptyString.Eq,
  rgb: rgb.Eq,
  uuid: uuid.Eq,
  safeDate: safeDate.Eq,
}

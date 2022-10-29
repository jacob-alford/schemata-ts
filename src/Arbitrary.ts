/**
 * SchemableExt instances for Arbitrary
 *
 * **Warning: DO NOT EDIT, this module is autogenerated**
 *
 * @since 0.0.3
 */
import * as Arb from './internal/ArbitraryBase'
import { SchemableExt1 } from './SchemableExt'

/** Generic */
import * as mapFromEntries from './generic/mapFromEntries'
import * as optionFromExclude from './generic/optionFromExclude'
import * as optionFromNullable from './generic/optionFromNullable'
import * as optionFromUndefined from './generic/optionFromUndefined'

/** Number */
import * as bigIntFromString from './number/bigIntFromString'
import * as float from './number/float'
import * as floatFromString from './number/floatFromString'
import * as int from './number/int'
import * as intFromString from './number/intFromString'

/** String */
import * as base64 from './string/base64'
import * as base64Url from './string/base64Url'
import * as creditCard from './string/creditCard'
import * as hslColor from './string/hslColor'
import * as isoDateString from './string/isoDateString'
import * as jwt from './string/jwt'
import * as latLong from './string/latLong'
import * as nonemptyString from './string/nonemptyString'
import * as rgb from './string/rgb'
import * as uuid from './string/uuid'

/** Date */
import * as date from './date/date'

/**
 * @since 0.0.1
 * @category Instances
 */
export const Schemable: SchemableExt1<Arb.URI> = {
  ...Arb.Schemable,
  ...Arb.WithBrand,
  ...Arb.WithPattern,
  ...Arb.WithRefine,
  ...Arb.WithUnknownContainers,
  mapFromEntries: mapFromEntries.Arbitrary,
  optionFromExclude: optionFromExclude.Arbitrary,
  optionFromNullable: optionFromNullable.Arbitrary,
  optionFromUndefined: optionFromUndefined.Arbitrary,
  bigIntFromString: bigIntFromString.Arbitrary,
  float: float.Arbitrary,
  floatFromString: floatFromString.Arbitrary,
  int: int.Arbitrary,
  intFromString: intFromString.Arbitrary,
  base64: base64.Arbitrary,
  base64Url: base64Url.Arbitrary,
  creditCard: creditCard.Arbitrary,
  hslColor: hslColor.Arbitrary,
  isoDateString: isoDateString.Arbitrary,
  jwt: jwt.Arbitrary,
  latLong: latLong.Arbitrary,
  nonemptyString: nonemptyString.Arbitrary,
  rgb: rgb.Arbitrary,
  uuid: uuid.Arbitrary,
  date: date.Arbitrary,
}

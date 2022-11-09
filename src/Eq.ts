/**
 * SchemableExt instances for Eq
 *
 * **Warning: DO NOT EDIT, this module is autogenerated**
 *
 * @since 0.0.1
 */
import * as Eq from './internal/EqBase'
import { SchemableExt1 } from './SchemableExt'

/** Schemables */
import * as WithBrand from './schemables/WithBrand'
import * as WithCheckDigit from './schemables/WithCheckDigit'
import * as WithInvariant from './schemables/WithInvariant'
import * as WithPadding from './schemables/WithPadding'
import * as WithPattern from './schemables/WithPattern'
import * as WithRefine from './schemables/WithRefine'
import * as WithUnknownContainers from './schemables/WithUnknownContainers'

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
import * as hslColor from './string/hslColor'
import * as latLong from './string/latLong'
import * as uuid from './string/uuid'

/** Date */
import * as date from './date/date'
import * as dateFromIsoString from './date/dateFromIsoString'

/**
 * @since 0.0.1
 * @category Instances
 */
export const Schemable: SchemableExt1<Eq.URI> = {
  ...Eq.Schemable,
  ...WithBrand.Eq,
  ...WithCheckDigit.Eq,
  ...WithInvariant.Eq,
  ...WithPadding.Eq,
  ...WithPattern.Eq,
  ...WithRefine.Eq,
  ...WithUnknownContainers.Eq,
  mapFromEntries: mapFromEntries.Eq,
  optionFromExclude: optionFromExclude.Eq,
  optionFromNullable: optionFromNullable.Eq,
  optionFromUndefined: optionFromUndefined.Eq,
  bigIntFromString: bigIntFromString.Eq,
  float: float.Eq,
  floatFromString: floatFromString.Eq,
  int: int.Eq,
  intFromString: intFromString.Eq,
  hslColor: hslColor.Eq,
  latLong: latLong.Eq,
  uuid: uuid.Eq,
  date: date.Eq,
  dateFromIsoString: dateFromIsoString.Eq,
}

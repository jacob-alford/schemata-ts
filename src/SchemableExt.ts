/**
 * The extended Schemable typeclass
 *
 * **Warning: DO NOT EDIT, this module is autogenerated**
 *
 * @since 0.0.1
 */
import { URIS, URIS2 } from 'fp-ts/HKT'
import {
  Schemable1,
  Schemable2C,
  WithRefine1,
  WithRefine2C,
  WithUnknownContainers1,
  WithUnknownContainers2C,
} from 'io-ts/Schemable'
import {
  Schemable2,
  SchemableHKT2,
  WithRefine2,
  WithRefineHKT2,
  WithUnknownContainers2,
  WithUnknownContainersHKT2,
} from './internal/Schemable2'
import { WithBrand1, WithBrand2, WithBrand2C, WithBrandHKT2 } from './internal/WithBrand'
import {
  WithPattern1,
  WithPattern2,
  WithPattern2C,
  WithPatternHKT2,
} from './internal/WithPattern'
import {
  WithInvariant1,
  WithInvariant2,
  WithInvariant2C,
  WithInvariantHKT2,
} from './internal/WithInvariant'

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
import * as safeDate from './date/safeDate'

/**
 * @since 0.0.1
 * @category Instances
 */
export interface SchemableExt<S>
  extends SchemableHKT2<S>,
    WithBrandHKT2<S>,
    WithPatternHKT2<S>,
    WithInvariantHKT2<S>,
    WithRefineHKT2<S>,
    WithUnknownContainersHKT2<S> {
  /**
   * Represents a ReadonlyMap converted from an expected array of entries.
   *
   * @since 1.0.0
   */
  readonly mapFromEntries: mapFromEntries.SchemableParams<S>

  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
   * Requires an inner schemable, and an Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   */
  readonly optionFromExclude: optionFromExclude.SchemableParams<S>

  /**
   * Represents a conversion from a nullable value to an Optional type
   *
   * @since 1.0.0
   */
  readonly optionFromNullable: optionFromNullable.SchemableParams<S>

  /**
   * Represents a conversion from an value that can be undefined to an Optional type
   *
   * @since 0.0.4
   */
  readonly optionFromUndefined: optionFromUndefined.SchemableParams<S>

  /**
   * Represents bigints converted from strings
   *
   * @since 1.0.0
   */
  readonly bigIntFromString: bigIntFromString.SchemableParams<S>

  /**
   * Floating point branded newtype. Parameters: min, max are inclusive.
   *
   * Represents floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  readonly float: float.SchemableParams<S>

  /**
   * Floating point branded newtype from strings. Parameters: min, max are inclusive.
   *
   * Represents string floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  readonly floatFromString: floatFromString.SchemableParams<S>

  /**
   * Integer branded newtype. Parameters: min, max are inclusive.
   *
   * Represents integers:
   *
   * ```math
   *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
   * ```
   *
   * @since 1.0.0
   */
  readonly int: int.SchemableParams<S>

  /**
   * Integer branded newtype from string. Parameters: min, max are inclusive.
   *
   * Note: has an optional `encodeToBase` parameter that controls the output base of the
   * encoded string. Currently only accepts 2, 8, 10, and 16 due to constraints using
   * `Number` as a parser. It does not decode in this specified base, and accepts any base
   * as input: 2, 8, 10, or 16.
   *
   * Represents string-integers:
   *
   * ```math
   *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
   * ```
   *
   * @since 1.0.0
   */
  readonly intFromString: intFromString.SchemableParams<S>

  /**
   * Representing a Base64-encoded string.
   *
   * For a URL-safe version, @see Base64UrlSafe module
   *
   * This module is heavily inspired by the `validator.js` module
   * [`isBase64`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBase64.js).
   *
   * @since 1.0.0
   */
  readonly base64: base64.SchemableParams<S>

  /**
   * Representing a URL-safe, Base64 encoded string.
   *
   * For a non-URL-safe alternative, @see Base64
   *
   * This module is heavily inspired by the `validator.js` module
   * [`isBase64`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBase64.js).
   *
   * @since 0.0.2
   */
  readonly base64Url: base64Url.SchemableParams<S>

  /**
   * Represents (some) valid credit card numbers.
   *
   * At the moment, this mostly handles Visa, Mastercard, American Express, Diners Club,
   * Discover, and JCB.
   *
   * @since 0.0.3
   */
  readonly creditCard: creditCard.SchemableParams<S>

  /**
   * An HSL string. Commonly in CSS.
   *
   * @since 0.0.3
   * @example
   *   import { Guard } from 'schemata-ts/string/hslColor'
   *
   *   const hue = 270
   *   const saturation = 60
   *   const lightness = 70
   *   const alpha = 0.7
   *
   *   const hslString = `hsl(${hue} ${saturation}% ${lightness}% / ${alpha})`
   *
   *   assert.equal(Guard.is(hslString), true)
   */
  readonly hslColor: hslColor.SchemableParams<S>

  /**
   * Represents strings that conform to the ISO 8601 standard.
   *
   * @since 0.0.1
   */
  readonly isoDateString: isoDateString.SchemableParams<S>

  /**
   * A valid, Base64-encoded JWT.
   *
   * Inspired by validator.js' [JWT
   * module](https://github.com/validatorjs/validator.js/blob/master/src/lib/isJWT.js).
   *
   * @since 0.0.2
   */
  readonly jwt: jwt.SchemableParams<S>

  /**
   * Representing a Lat/Long coordinate.
   *
   * Inspired by
   * [validator.js::isLatLong](https://github.com/validatorjs/validator.js/blob/master/src/lib/isLatLong.js)
   *
   * @since 0.0.4
   */
  readonly latLong: latLong.SchemableParams<S>

  /**
   * Represents strings that are not empty strings.
   *
   * @since 0.0.1
   */
  readonly nonemptyString: nonemptyString.SchemableParams<S>

  /**
   * Represents strings which are valid RGB colors. Permits both absolute and percentage
   * based values.
   *
   * @since 0.0.4
   */
  readonly rgb: rgb.SchemableParams<S>

  /**
   * Represents strings that are UUIDs.
   *
   * This is heavily inspired by the `validator.js` module
   * [`isUUID`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isUUID.js).
   *
   * @since 0.0.1
   */
  readonly uuid: uuid.SchemableParams<S>

  /**
   * Represents Date objects which are not invalid dates
   *
   * @since 1.0.0
   */
  readonly safeDate: safeDate.SchemableParams<S>
}

/**
 * @since 0.0.1
 * @category Instances
 */
export interface SchemableExt1<S extends URIS>
  extends Schemable1<S>,
    WithBrand1<S>,
    WithPattern1<S>,
    WithInvariant1<S>,
    WithRefine1<S>,
    WithUnknownContainers1<S> {
  /**
   * Represents a ReadonlyMap converted from an expected array of entries.
   *
   * @since 1.0.0
   */
  readonly mapFromEntries: mapFromEntries.SchemableParams1<S>

  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
   * Requires an inner schemable, and an Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   */
  readonly optionFromExclude: optionFromExclude.SchemableParams1<S>

  /**
   * Represents a conversion from a nullable value to an Optional type
   *
   * @since 1.0.0
   */
  readonly optionFromNullable: optionFromNullable.SchemableParams1<S>

  /**
   * Represents a conversion from an value that can be undefined to an Optional type
   *
   * @since 0.0.4
   */
  readonly optionFromUndefined: optionFromUndefined.SchemableParams1<S>

  /**
   * Represents bigints converted from strings
   *
   * @since 1.0.0
   */
  readonly bigIntFromString: bigIntFromString.SchemableParams1<S>

  /**
   * Floating point branded newtype. Parameters: min, max are inclusive.
   *
   * Represents floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  readonly float: float.SchemableParams1<S>

  /**
   * Floating point branded newtype from strings. Parameters: min, max are inclusive.
   *
   * Represents string floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  readonly floatFromString: floatFromString.SchemableParams1<S>

  /**
   * Integer branded newtype. Parameters: min, max are inclusive.
   *
   * Represents integers:
   *
   * ```math
   *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
   * ```
   *
   * @since 1.0.0
   */
  readonly int: int.SchemableParams1<S>

  /**
   * Integer branded newtype from string. Parameters: min, max are inclusive.
   *
   * Note: has an optional `encodeToBase` parameter that controls the output base of the
   * encoded string. Currently only accepts 2, 8, 10, and 16 due to constraints using
   * `Number` as a parser. It does not decode in this specified base, and accepts any base
   * as input: 2, 8, 10, or 16.
   *
   * Represents string-integers:
   *
   * ```math
   *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
   * ```
   *
   * @since 1.0.0
   */
  readonly intFromString: intFromString.SchemableParams1<S>

  /**
   * Representing a Base64-encoded string.
   *
   * For a URL-safe version, @see Base64UrlSafe module
   *
   * This module is heavily inspired by the `validator.js` module
   * [`isBase64`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBase64.js).
   *
   * @since 1.0.0
   */
  readonly base64: base64.SchemableParams1<S>

  /**
   * Representing a URL-safe, Base64 encoded string.
   *
   * For a non-URL-safe alternative, @see Base64
   *
   * This module is heavily inspired by the `validator.js` module
   * [`isBase64`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBase64.js).
   *
   * @since 0.0.2
   */
  readonly base64Url: base64Url.SchemableParams1<S>

  /**
   * Represents (some) valid credit card numbers.
   *
   * At the moment, this mostly handles Visa, Mastercard, American Express, Diners Club,
   * Discover, and JCB.
   *
   * @since 0.0.3
   */
  readonly creditCard: creditCard.SchemableParams1<S>

  /**
   * An HSL string. Commonly in CSS.
   *
   * @since 0.0.3
   * @example
   *   import { Guard } from 'schemata-ts/string/hslColor'
   *
   *   const hue = 270
   *   const saturation = 60
   *   const lightness = 70
   *   const alpha = 0.7
   *
   *   const hslString = `hsl(${hue} ${saturation}% ${lightness}% / ${alpha})`
   *
   *   assert.equal(Guard.is(hslString), true)
   */
  readonly hslColor: hslColor.SchemableParams1<S>

  /**
   * Represents strings that conform to the ISO 8601 standard.
   *
   * @since 0.0.1
   */
  readonly isoDateString: isoDateString.SchemableParams1<S>

  /**
   * A valid, Base64-encoded JWT.
   *
   * Inspired by validator.js' [JWT
   * module](https://github.com/validatorjs/validator.js/blob/master/src/lib/isJWT.js).
   *
   * @since 0.0.2
   */
  readonly jwt: jwt.SchemableParams1<S>

  /**
   * Representing a Lat/Long coordinate.
   *
   * Inspired by
   * [validator.js::isLatLong](https://github.com/validatorjs/validator.js/blob/master/src/lib/isLatLong.js)
   *
   * @since 0.0.4
   */
  readonly latLong: latLong.SchemableParams1<S>

  /**
   * Represents strings that are not empty strings.
   *
   * @since 0.0.1
   */
  readonly nonemptyString: nonemptyString.SchemableParams1<S>

  /**
   * Represents strings which are valid RGB colors. Permits both absolute and percentage
   * based values.
   *
   * @since 0.0.4
   */
  readonly rgb: rgb.SchemableParams1<S>

  /**
   * Represents strings that are UUIDs.
   *
   * This is heavily inspired by the `validator.js` module
   * [`isUUID`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isUUID.js).
   *
   * @since 0.0.1
   */
  readonly uuid: uuid.SchemableParams1<S>

  /**
   * Represents Date objects which are not invalid dates
   *
   * @since 1.0.0
   */
  readonly safeDate: safeDate.SchemableParams1<S>
}

/**
 * @since 0.0.1
 * @category Instances
 */
export interface SchemableExt2<S extends URIS2>
  extends Schemable2<S>,
    WithBrand2<S>,
    WithPattern2<S>,
    WithInvariant2<S>,
    WithRefine2<S>,
    WithUnknownContainers2<S> {
  /**
   * Represents a ReadonlyMap converted from an expected array of entries.
   *
   * @since 1.0.0
   */
  readonly mapFromEntries: mapFromEntries.SchemableParams2<S>

  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
   * Requires an inner schemable, and an Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   */
  readonly optionFromExclude: optionFromExclude.SchemableParams2<S>

  /**
   * Represents a conversion from a nullable value to an Optional type
   *
   * @since 1.0.0
   */
  readonly optionFromNullable: optionFromNullable.SchemableParams2<S>

  /**
   * Represents a conversion from an value that can be undefined to an Optional type
   *
   * @since 0.0.4
   */
  readonly optionFromUndefined: optionFromUndefined.SchemableParams2<S>

  /**
   * Represents bigints converted from strings
   *
   * @since 1.0.0
   */
  readonly bigIntFromString: bigIntFromString.SchemableParams2<S>

  /**
   * Floating point branded newtype. Parameters: min, max are inclusive.
   *
   * Represents floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  readonly float: float.SchemableParams2<S>

  /**
   * Floating point branded newtype from strings. Parameters: min, max are inclusive.
   *
   * Represents string floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  readonly floatFromString: floatFromString.SchemableParams2<S>

  /**
   * Integer branded newtype. Parameters: min, max are inclusive.
   *
   * Represents integers:
   *
   * ```math
   *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
   * ```
   *
   * @since 1.0.0
   */
  readonly int: int.SchemableParams2<S>

  /**
   * Integer branded newtype from string. Parameters: min, max are inclusive.
   *
   * Note: has an optional `encodeToBase` parameter that controls the output base of the
   * encoded string. Currently only accepts 2, 8, 10, and 16 due to constraints using
   * `Number` as a parser. It does not decode in this specified base, and accepts any base
   * as input: 2, 8, 10, or 16.
   *
   * Represents string-integers:
   *
   * ```math
   *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
   * ```
   *
   * @since 1.0.0
   */
  readonly intFromString: intFromString.SchemableParams2<S>

  /**
   * Representing a Base64-encoded string.
   *
   * For a URL-safe version, @see Base64UrlSafe module
   *
   * This module is heavily inspired by the `validator.js` module
   * [`isBase64`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBase64.js).
   *
   * @since 1.0.0
   */
  readonly base64: base64.SchemableParams2<S>

  /**
   * Representing a URL-safe, Base64 encoded string.
   *
   * For a non-URL-safe alternative, @see Base64
   *
   * This module is heavily inspired by the `validator.js` module
   * [`isBase64`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBase64.js).
   *
   * @since 0.0.2
   */
  readonly base64Url: base64Url.SchemableParams2<S>

  /**
   * Represents (some) valid credit card numbers.
   *
   * At the moment, this mostly handles Visa, Mastercard, American Express, Diners Club,
   * Discover, and JCB.
   *
   * @since 0.0.3
   */
  readonly creditCard: creditCard.SchemableParams2<S>

  /**
   * An HSL string. Commonly in CSS.
   *
   * @since 0.0.3
   * @example
   *   import { Guard } from 'schemata-ts/string/hslColor'
   *
   *   const hue = 270
   *   const saturation = 60
   *   const lightness = 70
   *   const alpha = 0.7
   *
   *   const hslString = `hsl(${hue} ${saturation}% ${lightness}% / ${alpha})`
   *
   *   assert.equal(Guard.is(hslString), true)
   */
  readonly hslColor: hslColor.SchemableParams2<S>

  /**
   * Represents strings that conform to the ISO 8601 standard.
   *
   * @since 0.0.1
   */
  readonly isoDateString: isoDateString.SchemableParams2<S>

  /**
   * A valid, Base64-encoded JWT.
   *
   * Inspired by validator.js' [JWT
   * module](https://github.com/validatorjs/validator.js/blob/master/src/lib/isJWT.js).
   *
   * @since 0.0.2
   */
  readonly jwt: jwt.SchemableParams2<S>

  /**
   * Representing a Lat/Long coordinate.
   *
   * Inspired by
   * [validator.js::isLatLong](https://github.com/validatorjs/validator.js/blob/master/src/lib/isLatLong.js)
   *
   * @since 0.0.4
   */
  readonly latLong: latLong.SchemableParams2<S>

  /**
   * Represents strings that are not empty strings.
   *
   * @since 0.0.1
   */
  readonly nonemptyString: nonemptyString.SchemableParams2<S>

  /**
   * Represents strings which are valid RGB colors. Permits both absolute and percentage
   * based values.
   *
   * @since 0.0.4
   */
  readonly rgb: rgb.SchemableParams2<S>

  /**
   * Represents strings that are UUIDs.
   *
   * This is heavily inspired by the `validator.js` module
   * [`isUUID`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isUUID.js).
   *
   * @since 0.0.1
   */
  readonly uuid: uuid.SchemableParams2<S>

  /**
   * Represents Date objects which are not invalid dates
   *
   * @since 1.0.0
   */
  readonly safeDate: safeDate.SchemableParams2<S>
}

/**
 * @since 0.0.1
 * @category Instances
 */
export interface SchemableExt2C<S extends URIS2>
  extends Schemable2C<S, unknown>,
    WithBrand2C<S, unknown>,
    WithPattern2C<S, unknown>,
    WithInvariant2C<S, unknown>,
    WithRefine2C<S, unknown>,
    WithUnknownContainers2C<S, unknown> {
  /**
   * Represents a ReadonlyMap converted from an expected array of entries.
   *
   * @since 1.0.0
   */
  readonly mapFromEntries: mapFromEntries.SchemableParams2C<S>

  /**
   * Represents an exclusion of a supplied value where the exclusion is mapped to `None`.
   * Requires an inner schemable, and an Eq instance which defaults to strict equality.
   *
   * @since 1.0.0
   */
  readonly optionFromExclude: optionFromExclude.SchemableParams2C<S>

  /**
   * Represents a conversion from a nullable value to an Optional type
   *
   * @since 1.0.0
   */
  readonly optionFromNullable: optionFromNullable.SchemableParams2C<S>

  /**
   * Represents a conversion from an value that can be undefined to an Optional type
   *
   * @since 0.0.4
   */
  readonly optionFromUndefined: optionFromUndefined.SchemableParams2C<S>

  /**
   * Represents bigints converted from strings
   *
   * @since 1.0.0
   */
  readonly bigIntFromString: bigIntFromString.SchemableParams2C<S>

  /**
   * Floating point branded newtype. Parameters: min, max are inclusive.
   *
   * Represents floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  readonly float: float.SchemableParams2C<S>

  /**
   * Floating point branded newtype from strings. Parameters: min, max are inclusive.
   *
   * Represents string floating point numbers:
   *
   * ```math
   *  { f | f ∈ ℝ, f >= -Number.MAX_VALUE, f <= Number.MAX_VALUE }
   * ```
   *
   * @since 1.0.0
   */
  readonly floatFromString: floatFromString.SchemableParams2C<S>

  /**
   * Integer branded newtype. Parameters: min, max are inclusive.
   *
   * Represents integers:
   *
   * ```math
   *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
   * ```
   *
   * @since 1.0.0
   */
  readonly int: int.SchemableParams2C<S>

  /**
   * Integer branded newtype from string. Parameters: min, max are inclusive.
   *
   * Note: has an optional `encodeToBase` parameter that controls the output base of the
   * encoded string. Currently only accepts 2, 8, 10, and 16 due to constraints using
   * `Number` as a parser. It does not decode in this specified base, and accepts any base
   * as input: 2, 8, 10, or 16.
   *
   * Represents string-integers:
   *
   * ```math
   *  { z | z ∈ ℤ, z >= -2 ** 53 + 1, z <= 2 ** 53 - 1 }
   * ```
   *
   * @since 1.0.0
   */
  readonly intFromString: intFromString.SchemableParams2C<S>

  /**
   * Representing a Base64-encoded string.
   *
   * For a URL-safe version, @see Base64UrlSafe module
   *
   * This module is heavily inspired by the `validator.js` module
   * [`isBase64`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBase64.js).
   *
   * @since 1.0.0
   */
  readonly base64: base64.SchemableParams2C<S>

  /**
   * Representing a URL-safe, Base64 encoded string.
   *
   * For a non-URL-safe alternative, @see Base64
   *
   * This module is heavily inspired by the `validator.js` module
   * [`isBase64`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isBase64.js).
   *
   * @since 0.0.2
   */
  readonly base64Url: base64Url.SchemableParams2C<S>

  /**
   * Represents (some) valid credit card numbers.
   *
   * At the moment, this mostly handles Visa, Mastercard, American Express, Diners Club,
   * Discover, and JCB.
   *
   * @since 0.0.3
   */
  readonly creditCard: creditCard.SchemableParams2C<S>

  /**
   * An HSL string. Commonly in CSS.
   *
   * @since 0.0.3
   * @example
   *   import { Guard } from 'schemata-ts/string/hslColor'
   *
   *   const hue = 270
   *   const saturation = 60
   *   const lightness = 70
   *   const alpha = 0.7
   *
   *   const hslString = `hsl(${hue} ${saturation}% ${lightness}% / ${alpha})`
   *
   *   assert.equal(Guard.is(hslString), true)
   */
  readonly hslColor: hslColor.SchemableParams2C<S>

  /**
   * Represents strings that conform to the ISO 8601 standard.
   *
   * @since 0.0.1
   */
  readonly isoDateString: isoDateString.SchemableParams2C<S>

  /**
   * A valid, Base64-encoded JWT.
   *
   * Inspired by validator.js' [JWT
   * module](https://github.com/validatorjs/validator.js/blob/master/src/lib/isJWT.js).
   *
   * @since 0.0.2
   */
  readonly jwt: jwt.SchemableParams2C<S>

  /**
   * Representing a Lat/Long coordinate.
   *
   * Inspired by
   * [validator.js::isLatLong](https://github.com/validatorjs/validator.js/blob/master/src/lib/isLatLong.js)
   *
   * @since 0.0.4
   */
  readonly latLong: latLong.SchemableParams2C<S>

  /**
   * Represents strings that are not empty strings.
   *
   * @since 0.0.1
   */
  readonly nonemptyString: nonemptyString.SchemableParams2C<S>

  /**
   * Represents strings which are valid RGB colors. Permits both absolute and percentage
   * based values.
   *
   * @since 0.0.4
   */
  readonly rgb: rgb.SchemableParams2C<S>

  /**
   * Represents strings that are UUIDs.
   *
   * This is heavily inspired by the `validator.js` module
   * [`isUUID`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isUUID.js).
   *
   * @since 0.0.1
   */
  readonly uuid: uuid.SchemableParams2C<S>

  /**
   * Represents Date objects which are not invalid dates
   *
   * @since 1.0.0
   */
  readonly safeDate: safeDate.SchemableParams2C<S>
}

/**
 * Represents strings that are UUIDs.
 *
 * This is heavily inspired by the `validator.js` module
 * [`isUUID`](https://github.com/validatorjs/validator.js/blob/master/src/lib/isUUID.js).
 *
 * @since 1.0.0
 */
import { Branded } from 'io-ts'
import * as PB from 'schemata-ts/PatternBuilder'
import { make, SchemaExt } from 'schemata-ts/SchemaExt'

const nHexDigits = (n: number) => PB.exactly(n)(PB.hexDigit)

/**
 * See: https://github.com/validatorjs/validator.js/blob/master/src/lib/isUUID.js
 *
 * @since 1.0.0
 * @category Pattern
 */
const uuidPattern = {
  1: PB.subgroup(
    PB.sequence(
      nHexDigits(8),
      PB.char('-'),
      nHexDigits(4),
      PB.char('-'),
      PB.char('1'),
      nHexDigits(3),
      PB.char('-'),
      nHexDigits(4),
      PB.char('-'),
      nHexDigits(12),
    ),
  ),
  2: PB.subgroup(
    PB.sequence(
      nHexDigits(8),
      PB.char('-'),
      nHexDigits(4),
      PB.char('-'),
      PB.char('2'),
      nHexDigits(3),
      PB.char('-'),
      nHexDigits(4),
      PB.char('-'),
      nHexDigits(12),
    ),
  ),
  3: PB.subgroup(
    PB.sequence(
      nHexDigits(8),
      PB.char('-'),
      nHexDigits(4),
      PB.char('-'),
      PB.char('3'),
      nHexDigits(3),
      PB.char('-'),
      nHexDigits(4),
      PB.char('-'),
      nHexDigits(12),
    ),
  ),
  4: PB.subgroup(
    PB.sequence(
      nHexDigits(8),
      PB.char('-'),
      nHexDigits(4),
      PB.char('-'),
      PB.char('4'),
      nHexDigits(3),
      PB.char('-'),
      PB.characterClass(false, '8', '9', 'a', 'b'),
      nHexDigits(3),
      PB.char('-'),
      nHexDigits(12),
    ),
  ),
  5: PB.subgroup(
    PB.sequence(
      nHexDigits(8),
      PB.char('-'),
      nHexDigits(4),
      PB.char('-'),
      PB.char('5'),
      nHexDigits(3),
      PB.char('-'),
      PB.characterClass(false, 'a', 'b', '8', '9'),
      nHexDigits(3),
      PB.char('-'),
      nHexDigits(12),
    ),
  ),
  any: PB.subgroup(
    PB.sequence(
      nHexDigits(8),
      PB.char('-'),
      nHexDigits(4),
      PB.char('-'),
      nHexDigits(4),
      PB.char('-'),
      nHexDigits(4),
      PB.char('-'),
      nHexDigits(12),
    ),
  ),
}

/**
 * @since 1.0.0
 * @category Model
 */
export type UUIDVersion = keyof typeof uuidPattern

interface UUIDBrand<Version extends UUIDVersion> {
  readonly UUID: unique symbol
  readonly UUIDVersion: Version
}

/**
 * Represents strings that are UUIDs.
 *
 * @since 1.0.0
 * @category Model
 */
export type UUID<Version extends UUIDVersion> = Branded<string, UUIDBrand<Version>>

/**
 * @since 1.0.0
 * @category Model
 */
export type UUIDS<Version extends UUIDVersion> = SchemaExt<string, UUID<Version>>

/**
 * @since 1.0.0
 * @category Schema
 */
export const UUID = <Version extends UUIDVersion>(version: Version): UUIDS<Version> =>
  make(s =>
    s.brand<UUIDBrand<Version>>()(
      s.pattern(uuidPattern[version], `UUID version ${version}`, true),
    ),
  )

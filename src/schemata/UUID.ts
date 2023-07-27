/** @since 1.0.0 */
import { pipe } from 'fp-ts/function'
import * as k from 'kuvio'
import * as Nt from 'schemata-ts/newtype'
import { type Schema } from 'schemata-ts/Schema'
import { Newtype } from 'schemata-ts/schemata/Newtype'
import { Pattern } from 'schemata-ts/schemata/Pattern'

/**
 * See: https://github.com/validatorjs/validator.js/blob/master/src/lib/isUUID.js
 *
 * @since 1.0.0
 * @category Pattern
 */
const uuidPattern = {
  1: k.patterns.uuidV1,
  2: k.patterns.uuidV2,
  3: k.patterns.uuidV3,
  4: k.patterns.uuidV4,
  5: k.patterns.uuidV5,
  any: k.patterns.anyUUID,
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
export interface UUID<Version extends UUIDVersion>
  extends Nt.Newtype<UUIDBrand<Version>, string> {}

/**
 * A newtype iso for UUID
 *
 * @since 2.0.0
 */
export const isoUUID = <Version extends UUIDVersion>() => Nt.iso<UUID<Version>>()

/**
 * @since 1.0.0
 * @category String
 */
export const UUID = <Version extends UUIDVersion>(
  version: Version,
): Schema<string, UUID<Version>> =>
  pipe(
    Pattern(uuidPattern[version], `UUID version ${version}`),
    Newtype(isoUUID<Version>(), `UUID version ${version}`),
  )

/** @since 1.0.0 */
import * as k from 'kuvio'
import { type Branded } from 'schemata-ts/brand'
import { type Schema } from 'schemata-ts/Schema'
import { Brand } from 'schemata-ts/schemata/Brand'
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
export type UUID<Version extends UUIDVersion> = Branded<string, UUIDBrand<Version>>

/**
 * @since 1.0.0
 * @category String
 */
export const UUID = <Version extends UUIDVersion>(
  version: Version,
): Schema<UUID<Version>, UUID<Version>> =>
  Brand<UUIDBrand<Version>>()(Pattern(uuidPattern[version], `UUID version ${version}`))

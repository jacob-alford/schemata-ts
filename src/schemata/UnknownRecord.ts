/** @since 1.0.0 */
import { type Schema } from 'schemata-ts/Schema'
import { Record } from 'schemata-ts/schemata/Record'
import { String } from 'schemata-ts/schemata/String'
import { Unknown } from 'schemata-ts/schemata/Unknown'

/**
 * @since 1.0.0
 * @category Unknown
 */
export const UnknownRecord: Schema<Readonly<Record<string, unknown>>> = Record(
  String(),
  Unknown,
)

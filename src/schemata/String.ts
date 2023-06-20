/** @since 1.0.0 */
import { type Schema, make } from 'schemata-ts/Schema'
import { type StringParams } from 'schemata-ts/schemables/primitives/definition'

/**
 * Represents string inputs / outputs
 *
 * @since 1.0.0
 */
export const String = (params?: StringParams): Schema<string> =>
  make(s => s.string(params))

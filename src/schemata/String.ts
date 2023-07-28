/** @since 1.0.0 */
import { make } from 'schemata-ts/internal/schema'
import { type Schema } from 'schemata-ts/Schema'
import { type StringParams } from 'schemata-ts/schemables/primitives/definition'

/**
 * Represents string inputs / outputs
 *
 * @since 1.0.0
 * @category String
 */
export const String = (params?: StringParams): Schema<string> =>
  make(s => s.string(params))

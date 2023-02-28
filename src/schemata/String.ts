/**
 * Represents string inputs / outputs
 *
 * @since 1.0.0
 */
import { make, Schema } from 'schemata-ts/Schema'
import { StringParams } from 'schemata-ts/schemables/WithPrimitives/definition'

/**
 * Represents string inputs / outputs
 *
 * @since 1.0.0
 */
export const String = (params?: StringParams): Schema<string, string> =>
  make(s => s.string(params))

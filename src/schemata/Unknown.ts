/** @since 1.0.0 */
import { type Schema, make } from 'schemata-ts/Schema'

/**
 * Represents any input / output
 *
 * @since 1.0.0
 * @category Unknown
 */
export const Unknown: Schema<unknown> = make(s => s.unknown)

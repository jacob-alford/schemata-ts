/** @since 1.0.0 */
import { type Schema, make } from 'schemata-ts/Schema'

/**
 * Represents boolean inputs / outputs
 *
 * @since 1.0.0
 * @category Boolean
 */
export const Boolean: Schema<boolean> = make(s => s.boolean)

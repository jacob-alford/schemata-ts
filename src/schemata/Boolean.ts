/** @since 1.0.0 */
import { make, Schema } from 'schemata-ts/Schema'

/**
 * Represents boolean inputs / outputs
 *
 * @since 1.0.0
 */
export const Boolean: Schema<boolean> = make(s => s.boolean)

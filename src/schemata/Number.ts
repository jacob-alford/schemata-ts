/** @since 1.0.0 */
import { type Float } from 'schemata-ts/float'
import { type Schema } from 'schemata-ts/Schema'
import { Float as Floating } from 'schemata-ts/schemata/Float'

/**
 * The number javascript type, represents a float of any valid value
 *
 * @since 1.0.0
 * @category Number
 */
export const Number: Schema<Float> = Floating()

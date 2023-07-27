/** @since 1.0.0 */
import { type Schema } from 'schemata-ts/Schema'
import { Array as ArrayS } from 'schemata-ts/schemata/Array'
import { Unknown } from 'schemata-ts/schemata/Unknown'

/**
 * @since 1.0.0
 * @category Unknown
 */
export const UnknownArray: Schema<ReadonlyArray<unknown>> = ArrayS(Unknown)

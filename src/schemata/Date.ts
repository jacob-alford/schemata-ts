/** @since 1.0.0 */
import { make } from 'schemata-ts/internal/schema'
import { type Schema } from 'schemata-ts/Schema'
import { type DateParams, type SafeDate } from 'schemata-ts/schemables/date/definition'

/**
 * Represents Javascript Date objects
 *
 * @since 1.0.0
 * @category Date
 */
export const Date: (options?: DateParams) => Schema<SafeDate> = params =>
  make(S => S.date(params))

import { make, Schema } from 'schemata-ts/Schema'
import { DateParams, SafeDate } from 'schemata-ts/schemables/date/definition'

/**
 * Represents Javascript Date objects
 *
 * @since 1.0.0
 * @category Schema
 */
export const Date: (options?: DateParams) => Schema<SafeDate> = params =>
  make(S => S.date(params))

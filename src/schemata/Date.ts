import * as SC from 'schemata-ts/Schema'
import { DateParams, SafeDate } from 'schemata-ts/schemables/date/definition'

/**
 * Represents Javascript Date objects
 *
 * @since 1.0.0
 * @category Schema
 */
export const Date: (options?: DateParams) => SC.Schema<SafeDate, SafeDate> = params =>
  SC.make(S => S.date(params))

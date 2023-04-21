import * as SC from 'schemata-ts/Schema'

/**
 * Parses any string parseable with `Date.parse` to a `Date` object.
 *
 * @since 1.0.0
 * @category Schema
 */
export const DateFromString = SC.make(S => S.dateFromString)

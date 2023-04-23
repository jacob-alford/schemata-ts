/** @since 1.0.0 */
import * as PB from 'schemata-ts/PatternBuilder'
import * as SC from 'schemata-ts/Schema'

/**
 * A schema for describing the structure of a string using patterns
 *
 * @since 1.0.0
 * @category Schema
 */
export const Pattern = (
  pattern: PB.Pattern,
  name: string,
  caseSensitive?: boolean,
): SC.Schema<string, string> => SC.make(S => S.pattern(pattern, name, caseSensitive))

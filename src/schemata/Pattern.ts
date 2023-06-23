/** @since 1.0.0 */
import type * as PB from 'schemata-ts/PatternBuilder'
import { type Schema, make } from 'schemata-ts/Schema'

/**
 * A schema for describing the structure of a string using patterns
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Pattern = (
  pattern: PB.Pattern,
  name: string,
  caseSensitive?: boolean,
): Schema<string, string> => make(S => S.pattern(pattern, name, caseSensitive))

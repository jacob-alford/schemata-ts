/** @since 1.0.0 */
import type * as k from 'kuvio'
import { make } from 'schemata-ts/internal/schema'
import { type Schema } from 'schemata-ts/Schema'

/**
 * A schema for describing the structure of a string using patterns
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Pattern = (
  pattern: k.Pattern,
  name: string | readonly [string, string],
  caseSensitive?: boolean,
): Schema<string, string> => make(S => S.pattern(pattern, name, caseSensitive))

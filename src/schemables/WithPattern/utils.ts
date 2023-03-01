/**
 * Utilities for `WithPattern`
 *
 * @since 1.0.0
 */
import * as G from 'schemata-ts/Guard'
import { Pattern, regexFromPattern } from 'schemata-ts/PatternBuilder'

/** @internal */
export const pattern: (
  pattern: Pattern,
  _: string,
  caseInsensitive?: boolean,
) => G.Guard<unknown, string> = (pattern, _, caseInsensitive) => {
  const regex = regexFromPattern(pattern, caseInsensitive)
  return {
    is: (i): i is string => typeof i === 'string' && regex.test(i),
  }
}

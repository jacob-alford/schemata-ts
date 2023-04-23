import * as G from 'schemata-ts/internal/guard'
import { Pattern, regexFromPattern } from 'schemata-ts/PatternBuilder'

/** @internal */
export const pattern: (pattern: Pattern, caseInsensitive?: boolean) => G.Guard<string> = (
  pattern,
  caseInsensitive,
) => {
  const regex = regexFromPattern(pattern, caseInsensitive)
  return {
    is: (i): i is string => typeof i === 'string' && regex.test(i),
  }
}

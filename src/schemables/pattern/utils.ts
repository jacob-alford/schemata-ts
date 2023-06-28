import { type Pattern, regexFromPattern } from 'kuvio'
import type * as G from 'schemata-ts/internal/guard'

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

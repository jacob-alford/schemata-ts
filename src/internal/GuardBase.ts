import * as G from 'io-ts/Guard'
import { Pattern, regexFromPattern } from '../PatternBuilder'
import { WithPattern1 } from './WithPattern'

export * from 'io-ts/Guard'

/** @internal */
export const pattern: (
  pattern: Pattern,
  _: string
) => G.Guard<unknown, string> = pattern => {
  const regex = regexFromPattern(pattern)
  return {
    is: (i): i is string => typeof i === 'string' && regex.test(i),
  }
}

export const WithPattern: WithPattern1<G.URI> = {
  pattern,
}

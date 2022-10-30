import { identity } from 'fp-ts/function'
import * as G from 'io-ts/Guard'
import { Pattern, regexFromPattern } from '../PatternBuilder'
import { WithBrand1 } from './WithBrand'
import { WithInvariant1 } from './WithInvariant'
import { WithPattern1 } from './WithPattern'

export * from 'io-ts/Guard'

/** @internal */
export const pattern: (
  pattern: Pattern,
  _: string,
  caseInsensitive?: boolean
) => G.Guard<unknown, string> = (pattern, _, caseInsensitive) => {
  const regex = regexFromPattern(pattern, caseInsensitive)
  return {
    is: (i): i is string => typeof i === 'string' && regex.test(i),
  }
}

export const WithPattern: WithPattern1<G.URI> = {
  pattern,
}

export const WithBrand: WithBrand1<G.URI> = {
  // @ts-expect-error -- Branding is only type change, implicit cast here
  brand: () => identity,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const WithInvariant: WithInvariant1<G.URI> = {
  imap: gB => () => () => gB,
}

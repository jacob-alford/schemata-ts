import { identity } from 'fp-ts/function'
import * as Eq from 'io-ts/Eq'
import { WithBrand1 } from './WithBrand'
import { WithInvariant1 } from './WithInvariant'
import { WithPattern1 } from './WithPattern'

export * from 'io-ts/Eq'

/**
 * @since 1.0.0
 * @category Instances
 */
export const WithPattern: WithPattern1<Eq.URI> = {
  pattern: () => Eq.string,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const WithBrand: WithBrand1<Eq.URI> = {
  brand: () => identity,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const WithInvariant: WithInvariant1<Eq.URI> = {
  imap: () => (_, reverseGet) => eqA => ({
    equals: (x, y) => eqA.equals(reverseGet(x), reverseGet(y)),
  }),
}

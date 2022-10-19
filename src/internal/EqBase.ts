import { identity } from 'fp-ts/function'
import * as Eq from 'io-ts/Eq'
import { WithBrand1 } from './WithBrand'
import { WithPattern1 } from './WithPattern'

export * from 'io-ts/Eq'

export const WithPattern: WithPattern1<Eq.URI> = {
  pattern: () => Eq.string,
}

export const WithBrand: WithBrand1<Eq.URI> = {
  brand: () => identity,
}

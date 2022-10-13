import { identity } from 'fp-ts/function'
import * as D from 'io-ts/Decoder'
import { pattern } from './GuardBase'
import { WithBrand2C } from './WithBrand'
import { WithPattern2C } from './WithPattern'

export * from 'io-ts/Decoder'

export const WithPattern: WithPattern2C<D.URI, unknown> = {
  pattern: (p, desc) => D.fromGuard(pattern(p, desc), desc),
}

export const WithBrand: WithBrand2C<D.URI, unknown> = {
  // @ts-expect-error -- Branding is only type change, implicit cast here
  brand: () => identity,
}

import { identity } from 'fp-ts/function'
import * as TD from 'io-ts/TaskDecoder'
import { pattern } from './GuardBase'
import { WithBrand2C } from './WithBrand'
import { WithPattern2C } from './WithPattern'

export * from 'io-ts/TaskDecoder'

export const WithPattern: WithPattern2C<TD.URI, unknown> = {
  pattern: (p, desc, caseInsensitive) =>
    TD.fromGuard(pattern(p, desc, caseInsensitive), desc),
}

export const WithBrand: WithBrand2C<TD.URI, unknown> = {
  // @ts-expect-error -- Branding is only type change, implicit cast here
  brand: () => identity,
}

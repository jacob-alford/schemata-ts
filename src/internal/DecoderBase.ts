import { flow, identity } from 'fp-ts/function'
import * as D from 'io-ts/Decoder'
import * as E from 'fp-ts/Either'
import { pattern } from './GuardBase'
import { WithBrand2C } from './WithBrand'
import { WithInvariant2C } from './WithInvariant'
import { WithPattern2C } from './WithPattern'

export * from 'io-ts/Decoder'

export const WithPattern: WithPattern2C<D.URI, unknown> = {
  pattern: (p, desc, caseInsensitive) =>
    D.fromGuard(pattern(p, desc, caseInsensitive), desc),
}

export const WithBrand: WithBrand2C<D.URI, unknown> = {
  // @ts-expect-error -- Branding is only type change, implicit cast here
  brand: () => identity,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const WithInvariant: WithInvariant2C<D.URI, unknown> = {
  imap: () => get => dA => ({
    decode: flow(dA.decode, E.map(get)),
  }),
}

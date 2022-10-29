import { flow, identity } from 'fp-ts/function'
import * as D from 'io-ts/Decoder'
import * as E from 'fp-ts/Either'
import { pattern } from './GuardBase'
import { WithBrand2C } from './WithBrand'
import { WithIso2C } from './WithIso'
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
export const WithIso: WithIso2C<D.URI, unknown> = {
  iso:
    ({ get }) =>
    dA => ({
      decode: flow(dA.decode, E.map(get)),
    }),
}

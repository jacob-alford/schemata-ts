import { flow, identity } from 'fp-ts/function'
import * as TD from 'io-ts/TaskDecoder'
import * as TE from 'fp-ts/TaskEither'
import { pattern } from './GuardBase'
import { WithBrand2C } from './WithBrand'
import { WithInvariant2C } from './WithInvariant'
import { WithPattern2C } from './WithPattern'

export * from 'io-ts/TaskDecoder'

/**
 * @since 1.0.0
 * @category Instances
 */
export const WithPattern: WithPattern2C<TD.URI, unknown> = {
  pattern: (p, desc, caseInsensitive) =>
    TD.fromGuard(pattern(p, desc, caseInsensitive), desc),
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const WithBrand: WithBrand2C<TD.URI, unknown> = {
  // @ts-expect-error -- Branding is only type change, implicit cast here
  brand: () => identity,
}

/**
 * @since 1.0.0
 * @category Instances
 */
export const WithInvariant: WithInvariant2C<TD.URI, unknown> = {
  imap: () => get => tdA => ({
    decode: flow(tdA.decode, TE.map(get)),
  }),
}

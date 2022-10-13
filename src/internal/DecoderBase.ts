import * as D from 'io-ts/Decoder'
import { pattern } from './GuardBase'
import { WithPattern2C } from './WithPattern'

export * from 'io-ts/Decoder'

export const WithPattern: WithPattern2C<D.URI, unknown> = {
  pattern: (p, desc) => D.fromGuard(pattern(p, desc), desc),
}

import * as TD from 'io-ts/TaskDecoder'
import { pattern } from './GuardBase'
import { WithPattern2C } from './WithPattern'

export * from 'io-ts/TaskDecoder'

export const WithPattern: WithPattern2C<TD.URI, unknown> = {
  pattern: (p, desc) => TD.fromGuard(pattern(p, desc), desc),
}

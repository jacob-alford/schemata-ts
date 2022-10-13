import * as Eq from 'io-ts/Eq'
import { WithPattern1 } from './WithPattern'

export * from 'io-ts/Eq'

export const WithPattern: WithPattern1<Eq.URI> = {
  pattern: () => Eq.string,
}

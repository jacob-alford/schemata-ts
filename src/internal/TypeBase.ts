import { pipe } from 'fp-ts/function'
import * as t from 'io-ts/Type'
import { pattern as guardPattern } from './GuardBase'
import { WithPattern1 } from './WithPattern'

export * from 'io-ts/Type'

export const WithPattern: WithPattern1<t.URI> = {
  pattern: (p, desc) =>
    pipe(t.string, t.refine<string, string>(guardPattern(p, desc).is, desc)),
}

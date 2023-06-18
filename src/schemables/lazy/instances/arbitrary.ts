import { Lazy } from 'fp-ts/function'
import * as Arb from 'schemata-ts/internal/arbitrary'
import { WithLazy } from 'schemata-ts/schemables/lazy/definition'

export const LazyArbitrary: WithLazy<Arb.SchemableLambda> = {
  lazy: <O>(f: Lazy<Arb.Arbitrary<O>>): Arb.Arbitrary<O> => ({
    arbitrary: fc => fc.memo(() => f().arbitrary(fc))(),
  }),
}

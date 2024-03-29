import { type Lazy } from 'fp-ts/function'
import * as Arb from 'schemata-ts/internal/arbitrary'
import { memoize } from 'schemata-ts/internal/schema'
import { type WithLazy } from 'schemata-ts/schemables/lazy/definition'

export const LazyArbitrary: WithLazy<Arb.SchemableLambda> = {
  lazy: <O>(_: string, f: Lazy<Arb.Arbitrary<O>>): Arb.Arbitrary<O> => {
    const get = memoize<void, Arb.Arbitrary<O>>(f)
    return Arb.makeArbitrary(fc => fc.constant(null).chain(() => get().arbitrary(fc)))
  },
}

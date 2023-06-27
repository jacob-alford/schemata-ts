import * as fc from 'fast-check'
import { type Lazy } from 'fp-ts/function'
import type * as Arb from 'schemata-ts/internal/arbitrary'
import { memoize } from 'schemata-ts/Schema'
import { type WithLazy } from 'schemata-ts/schemables/lazy/definition'

export const LazyArbitrary: WithLazy<Arb.SchemableLambda> = {
  lazy: <O>(_: string, f: Lazy<fc.Arbitrary<O>>): fc.Arbitrary<O> => {
    const get = memoize<void, fc.Arbitrary<O>>(f)
    return fc.constant(null).chain(() => get())
  },
}

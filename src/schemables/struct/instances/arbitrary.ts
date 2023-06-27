import * as fc from 'fast-check'
import { identity } from 'fp-ts/function'
import type * as Arb from 'schemata-ts/internal/arbitrary'
import { type WithStruct } from 'schemata-ts/schemables/struct/definition'
import { remapPropertyKeys, safeIntersect } from 'schemata-ts/schemables/struct/utils'

const readonly: <A>(a: A) => Readonly<A> = identity

export const StructArbitrary: WithStruct<Arb.SchemableLambda> = {
  struct: properties => {
    const lookupByOutputKey = remapPropertyKeys(properties, i => 1 / i)

    const collapsedArbs: Record<string, fc.Arbitrary<unknown>> = {}

    for (const key in lookupByOutputKey) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const arbs = lookupByOutputKey[key]!

      collapsedArbs[key] =
        arbs.length === 1
          ? arbs[0].member
          : fc.oneof(
              ...arbs.map(({ member, precedence }) => ({
                arbitrary: member,
                weight: precedence,
              })),
            )
    }

    const out = {} as any
    for (const key in collapsedArbs) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      out[key] = collapsedArbs[key]!
    }

    return fc.record(out) as any
  },

  record: (key, codomain) => fc.dictionary(key, codomain).map(readonly),
  intersection: (xs, ys) => fc.tuple(xs, ys).map(([x, y]) => safeIntersect(x, y)),
}

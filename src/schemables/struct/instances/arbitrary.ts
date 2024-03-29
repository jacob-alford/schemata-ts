import { identity } from 'fp-ts/function'
import * as Arb from 'schemata-ts/internal/arbitrary'
import { type WithStruct } from 'schemata-ts/schemables/struct/definition'
import { remapPropertyKeys, safeIntersect } from 'schemata-ts/schemables/struct/utils'

const readonly: <A>(a: A) => Readonly<A> = identity

export const StructArbitrary: WithStruct<Arb.SchemableLambda> = {
  struct: (
    properties,
    // istanbul ignore next
    extraParams = 'strip',
  ) => {
    const lookupByOutputKey = remapPropertyKeys(properties, i => 1000 / i)

    const collapsedArbs: Record<string, Arb.Arbitrary<unknown>> = {}

    for (const key in lookupByOutputKey) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const arbs = lookupByOutputKey[key]!
      collapsedArbs[key] =
        arbs.length === 1
          ? Arb.makeArbitrary(fc => arbs[0].member.arbitrary(fc))
          : Arb.makeArbitrary(fc =>
              fc.oneof(
                ...arbs.map(({ member, precedence }) => ({
                  arbitrary: member.arbitrary(fc),
                  weight: Math.ceil(precedence),
                })),
              ),
            )
    }

    return Arb.makeArbitrary(fc => {
      const out = {} as any
      for (const key in collapsedArbs) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const arb = collapsedArbs[key]!
        out[key] = arb.arbitrary(fc)
      }

      if (typeof extraParams !== 'string') {
        return fc
          .tuple(
            fc.record(out),
            fc.dictionary(
              fc.string().filter(k => k !== '__proto__'),
              extraParams.arbitrary(fc),
            ),
          )
          .map(([a, b]) => safeIntersect(a, b))
      }

      return fc.record(out) as any
    })
  },
  record: (key, codomain) =>
    Arb.makeArbitrary(fc =>
      fc
        .dictionary(
          key.arbitrary(fc).filter(k => k !== '__proto__'),
          codomain.arbitrary(fc),
        )
        .map(readonly),
    ),
  intersection: (xs, ys) =>
    Arb.makeArbitrary(fc =>
      fc.tuple(xs.arbitrary(fc), ys.arbitrary(fc)).map(([x, y]) => safeIntersect(x, y)),
    ),
}

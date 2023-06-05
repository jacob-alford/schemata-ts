import { pipe } from 'fp-ts/function'
import * as Arb from 'schemata-ts/internal/arbitrary'
import { forIn, hasOwn } from 'schemata-ts/internal/util'
import { PrimitivesArbitrary } from 'schemata-ts/schemables/primitives/instances/arbitrary'
import { WithStruct } from 'schemata-ts/schemables/struct/definition'
import { remapPropertyKeys } from 'schemata-ts/schemables/struct/utils'
import { hasImplicitOptional } from 'schemata-ts/struct'

export const StructArbitrary: WithStruct<Arb.SchemableLambda> = {
  struct: (properties, params = { extraProps: 'strip' }) => {
    const lookupByOutputKey = remapPropertyKeys(properties, i => 1 / i)

    const collapsedArbs: Record<string, Arb.Arbitrary<unknown>> = {}

    for (const key in lookupByOutputKey) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const arbs = lookupByOutputKey[key]!

      collapsedArbs[key] =
        arbs.length === 1
          ? { arbitrary: fc => arbs[0].member.arbitrary(fc) }
          : {
              arbitrary: fc =>
                fc.oneof(
                  ...arbs.map(({ member, precedence }) => ({
                    arbitrary: member.arbitrary(fc),
                    weight: precedence,
                  })),
                ),
            }
    }

    return {
      arbitrary: fc => {
        const out = {} as any
        pipe(
          collapsedArbs,
          forIn((key, arb) => () => {
            out[key] = hasImplicitOptional(arb)
              ? fc.option(arb.arbitrary(fc), { nil: undefined })
              : arb.arbitrary(fc)
          }),
        )()

        if (params.extraProps === 'restParam') {
          const rest = params.restParam
          if (rest !== undefined) {
            const record = fc.dictionary(
              PrimitivesArbitrary.string()
                .arbitrary(fc)
                .filter(k => k !== '__proto__' && !hasOwn(lookupByOutputKey, k)),
              rest.arbitrary(fc),
            )
            return fc
              .record(out)
              .chain(r => record.map(rest => ({ ...rest, ...r }))) as any
          }
        }

        return fc.record(out)
      },
    }
  },
}

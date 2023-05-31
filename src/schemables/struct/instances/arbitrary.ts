import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Arb from 'schemata-ts/internal/arbitrary'
import { forIn, hasOwn } from 'schemata-ts/internal/util'
import { PrimitivesArbitrary } from 'schemata-ts/schemables/primitives/instances/arbitrary'
import { WithStruct } from 'schemata-ts/schemables/struct/definition'
import { getKeyRemap, hasImplicitOptional } from 'schemata-ts/struct'

export const StructArbitrary: WithStruct<Arb.SchemableLambda> = {
  struct: (properties, params = { extraProps: 'strip' }) => {
    const lookupByOutputKey: Record<
      string,
      RNEA.ReadonlyNonEmptyArray<{ arbitrary: Arb.Arbitrary<unknown>; weight: number }>
    > = {} as any
    for (const key in properties) {
      const prop = properties[key]

      if (!hasOwn(properties, key) || prop === undefined) continue

      const { schemable, information } = prop

      const outputKey: string = pipe(
        getKeyRemap(schemable),
        O.getOrElseW(() => key),
      )

      const outputKeyUnion = pipe(
        lookupByOutputKey,
        RR.lookup(outputKey),
        O.fold(
          () => RNEA.of({ arbitrary: schemable, weight: 1 / information }),
          RA.append({ arbitrary: schemable, weight: 1 / information }),
        ),
      )

      lookupByOutputKey[outputKey] = outputKeyUnion
    }

    const collapsedArbs: Record<string, Arb.Arbitrary<unknown>> = {}

    for (const key in lookupByOutputKey) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const arbs = lookupByOutputKey[key]!

      collapsedArbs[key] =
        arbs.length === 1
          ? { arbitrary: fc => arbs[0].arbitrary.arbitrary(fc) }
          : {
              arbitrary: fc =>
                fc.oneof(
                  ...arbs.map(({ arbitrary, weight }) => ({
                    arbitrary: arbitrary.arbitrary(fc),
                    weight,
                  })),
                ),
            }
    }
    const out = {} as any
    return {
      arbitrary: fc => {
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

import { pipe } from 'fp-ts/function'
import * as Arb from 'schemata-ts/Arbitrary'
import { forIn, hasOwn } from 'schemata-ts/internal/util'
import { WithStructM } from 'schemata-ts/schemables/WithStructM/definition'
import { hasImplicitOptional, keyIsNotMapped } from 'schemata-ts/struct'

export const WithStructMArbitrary: WithStructM<Arb.SchemableLambda> = {
  structM: (properties, params = { extraProps: 'strip' }) => {
    const remappedProps: Record<string, Arb.Arbitrary<unknown>> = {}
    for (const key in properties) {
      const prop = properties[key]
      if (!hasOwn(properties, key) || prop === undefined) continue
      if (keyIsNotMapped(prop._keyRemap)) {
        remappedProps[key] = prop._val
        continue
      }
      remappedProps[prop._keyRemap] = prop._val
    }
    return {
      arbitrary: fc => {
        const out = {} as any
        pipe(
          remappedProps,
          forIn((key, arb) => () => {
            out[key] = hasImplicitOptional(arb)
              ? fc.option(arb.arbitrary(fc), { nil: undefined })
              : arb.arbitrary(fc)
          }),
        )()
        if (params.extraProps === 'restParam') {
          const rest = params.restParam
          if (rest !== undefined) {
            return Arb.intersect({ arbitrary: fc => fc.record(out) })(
              Arb.record(rest),
            ).arbitrary(fc)
          }
        }

        return fc.record(out) as any
      },
    }
  },
}

/**
 * WithStructM instance for Arbitrary
 *
 * @since 1.3.0
 */
import { pipe, tuple } from 'fp-ts/function'
import * as Arb from 'schemata-ts/base/ArbitraryBase'
import { forIn, hasOwn } from 'schemata-ts/internal/util'
import {
  isOptionalFlag,
  KeyFlag,
  keyIsNotMapped,
  structTools,
  WithStructM1,
} from 'schemata-ts/schemables/WithStructM/definition'

/**
 * @since 1.3.0
 * @category Instances
 */
export const Arbitrary: WithStructM1<Arb.URI> = {
  structM: (getProperties, params = { extraProps: 'strip' }) => {
    const properties = getProperties(structTools)
    const remappedProps: Record<string, readonly [KeyFlag, Arb.Arbitrary<unknown>]> = {}
    for (const key in properties) {
      const prop = properties[key]
      if (!hasOwn(properties, key) || prop === undefined) continue
      if (keyIsNotMapped(prop._keyRemap)) {
        remappedProps[key] = tuple(prop._flag, prop._val)
        continue
      }
      remappedProps[prop._keyRemap] = tuple(prop._flag, prop._val)
    }
    return {
      arbitrary: fc => {
        const out = {} as any
        pipe(
          remappedProps,
          forIn((key, [flag, arb]) => () => {
            out[key] = isOptionalFlag(flag)
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

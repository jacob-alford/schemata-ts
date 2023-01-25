/**
 * WithStructM instance for Arbitrary
 *
 * @since 1.3.0
 */
import { pipe } from 'fp-ts/function'
import * as Arb from 'schemata-ts/base/ArbitraryBase'
import { forIn, hasOwn } from 'schemata-ts/internal/util'
import {
  isOptionalFlag,
  keyIsNotMapped,
  WithStructM1,
} from 'schemata-ts/schemables/WithStructM/definition'

/**
 * @since 1.3.0
 * @category Instances
 */
export const Arbitrary: WithStructM1<Arb.URI> = {
  structM: properties => ({
    arbitrary: fc => {
      const out = {} as any
      pipe(
        properties,
        forIn((key, { _flag: flag, _keyRemap: mapToKey, _val: arb }) => () => {
          // If key is mapped, but the output already has that key, then the result is an intersection of the two arbitraries
          if (!keyIsNotMapped(mapToKey) && hasOwn(out, mapToKey)) {
            out[mapToKey] = Arb.intersect(arb)(out[mapToKey]).arbitrary(fc)
            return
          }
          if (hasOwn(out, key)) {
            out[key] = Arb.intersect(arb)(out[key]).arbitrary(fc)
            return
          }
          out[keyIsNotMapped(mapToKey) || hasOwn(properties, mapToKey) ? key : mapToKey] =
            isOptionalFlag(flag) ? fc.option(arb.arbitrary(fc)) : arb.arbitrary(fc)
        }),
      )()
      return fc.record(out) as any
    },
  }),
}

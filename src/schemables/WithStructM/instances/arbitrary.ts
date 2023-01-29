/**
 * WithStructM instance for Arbitrary
 *
 * @since 1.3.0
 */
import { pipe } from 'fp-ts/function'
import * as Arb from 'schemata-ts/base/ArbitraryBase'
import { forIn } from 'schemata-ts/internal/util'
import {
  isOptionalFlag,
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
    return {
      arbitrary: fc => {
        const out = {} as any
        pipe(
          properties,
          forIn((key, { _flag: flag, _val: arb }) => () => {
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

import * as RA from 'fp-ts/ReadonlyArray'
import * as Arb from 'schemata-ts/internal/arbitrary'
import { type WithArray } from 'schemata-ts/schemables/array/definition'

export const ArrayArbitrary: WithArray<Arb.SchemableLambda> = {
  array: params => {
    const { minLength = 0, maxLength = 2 ** 32 - 2 } = params
    return item =>
      Arb.makeArbitrary(fc =>
        fc.array(item.arbitrary(fc), {
          minLength: Math.floor(Math.max(minLength, 0)),
          maxLength: Math.floor(Math.min(maxLength, 2 ** 32 - 2)),
        }),
      )
  },
  tuple: (_, ...components) =>
    Arb.makeArbitrary(fc => {
      if (components.length === 0) {
        return fc.constant(RA.zero())
      }
      return fc.tuple(...components.map(arb => arb.arbitrary(fc))) as any
    }),
}

import * as fc from 'fast-check'
import * as RA from 'fp-ts/ReadonlyArray'
import type * as Arb from 'schemata-ts/internal/arbitrary'
import { type WithArray } from 'schemata-ts/schemables/array/definition'

export const ArrayArbitrary: WithArray<Arb.SchemableLambda> = {
  array: (params = {}) => {
    const { minLength = 0, maxLength = 2 ** 32 - 2 } = params
    return item =>
      fc.array(item, {
        minLength: Math.floor(Math.max(minLength, 0)),
        maxLength: Math.floor(Math.min(maxLength, 2 ** 32 - 2)),
      })
  },
  tuple: (...components) => {
    if (components.length === 0) {
      return fc.constant(RA.zero())
    }
    return fc.tuple(...components) as any
  },
}

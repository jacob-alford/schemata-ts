import * as fc from 'fast-check'
import type * as Arb from 'schemata-ts/internal/arbitrary'
import { type WithPrimitives } from 'schemata-ts/schemables/primitives/definition'
import { isFloat, isInt } from 'schemata-ts/schemables/primitives/utils'

/** @since 2.0.0 */
export const PrimitivesArbitrary: WithPrimitives<Arb.SchemableLambda> = {
  string: params =>
    fc.oneof(
      fc.string(params),
      fc.asciiString(params),
      fc.hexaString(params),
      fc.base64String(params),
    ),
  int: (params = {}) => {
    const { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = params
    return fc
      .integer({
        min: Math.floor(Math.max(min, Number.MIN_SAFE_INTEGER)),
        max: Math.floor(Math.min(max, Number.MAX_SAFE_INTEGER)),
      })
      .filter(isInt(params))
  },
  float(params = {}) {
    const { min = -Number.MAX_VALUE, max = Number.MAX_VALUE } = params
    return fc
      .double({
        min,
        max,
        noDefaultInfinity: true,
        noNaN: true,
      })
      .filter(isFloat(params))
  },
  boolean: fc.boolean(),
  unknown: fc.anything(),
  literal: (...literals) => fc.oneof(...literals.map(v => fc.constant(v))),
}

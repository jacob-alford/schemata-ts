import * as Arb from 'schemata-ts/internal/arbitrary'
import { type WithPrimitives } from 'schemata-ts/schemables/primitives/definition'
import { isFloat, isInt } from 'schemata-ts/schemables/primitives/utils'

export const PrimitivesArbitrary: WithPrimitives<Arb.SchemableLambda> = {
  string: params =>
    Arb.makeArbitrary(fc =>
      fc.oneof(
        fc.string(params),
        fc.asciiString(params),
        fc.hexaString(params),
        fc.base64String(params),
      ),
    ),
  int: (params = {}) => {
    const { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = params
    return Arb.makeArbitrary(fc =>
      fc
        .integer({
          min: Math.floor(Math.max(min, Number.MIN_SAFE_INTEGER)),
          max: Math.floor(Math.min(max, Number.MAX_SAFE_INTEGER)),
        })
        .filter(isInt(params)),
    )
  },
  float(params = {}) {
    const { min = -Number.MAX_VALUE, max = Number.MAX_VALUE } = params
    return Arb.makeArbitrary(fc =>
      fc
        .double({
          min: Math.max(min, -Number.MAX_VALUE),
          max: Math.min(max, Number.MAX_VALUE),
          noDefaultInfinity: true,
          noNaN: true,
        })
        .filter(isFloat(params)),
    )
  },
  boolean: Arb.makeArbitrary(fc => fc.boolean()),
  unknown: Arb.makeArbitrary(fc => fc.anything()),
  literal: (...literals) =>
    Arb.makeArbitrary(fc => fc.oneof(...literals.map(v => fc.constant(v)))),
}

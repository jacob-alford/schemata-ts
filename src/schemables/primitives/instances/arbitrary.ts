import * as Arb from 'schemata-ts/internal/arbitrary'
import { WithPrimitives } from 'schemata-ts/schemables/primitives/definition'
import { isFloat, isInt } from 'schemata-ts/schemables/primitives/utils'

/** @since 2.0.0 */
export const PrimitivesArbitrary: WithPrimitives<Arb.SchemableLambda> = {
  string: (params = {}) => ({
    arbitrary: fc =>
      fc.oneof(
        fc.string(params),
        fc.asciiString(params),
        fc.fullUnicodeString(params),
        fc.hexaString(params),
        fc.base64String(params),
        fc.fullUnicodeString(params),
      ),
  }),
  int: (params = {}) => {
    const { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = params
    return {
      arbitrary: fc =>
        fc
          .integer({
            min: Math.floor(Math.max(min, Number.MIN_SAFE_INTEGER)),
            max: Math.floor(Math.min(max, Number.MAX_SAFE_INTEGER)),
          })
          .filter(isInt(params)),
    }
  },
  float(params = {}) {
    const { min = -Number.MAX_VALUE, max = Number.MAX_VALUE } = params
    return {
      arbitrary: fc =>
        fc
          .double({
            min,
            max,
            noDefaultInfinity: true,
            noNaN: true,
          })
          .filter(isFloat(params)),
    }
  },
  boolean: { arbitrary: fc => fc.boolean() },
  unknown: { arbitrary: fc => fc.anything() },
  literal: (...literals) => ({
    arbitrary: fc => fc.oneof(...literals.map(v => fc.constant(v))),
  }),
}

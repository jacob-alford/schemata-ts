import * as JS from 'schemata-ts/JsonSchema'
import { WithPrimitives } from 'schemata-ts/schemables/WithPrimitives/definition'

/** @since 2.0.0 */
export const JsonSchema: WithPrimitives<JS.SchemableLambda> = {
  string: JS.makeStringSchema,
  int: (params = {}) =>
    JS.makeIntegerSchema({ minimum: params.min, maximum: params.max }),
  float: (params = {}) =>
    JS.makeNumberSchema({ minimum: params.min, maximum: params.max }),
  boolean: JS.booleanSchema,
  unknown: JS.emptySchema,
  literal: (...literals) =>
    JS.makeUnionSchema(...literals.map(literal => JS.makeConstSchema(literal))),
}

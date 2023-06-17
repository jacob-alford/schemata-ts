import * as JS from 'schemata-ts/internal/json-schema'
import { WithPrimitives } from 'schemata-ts/schemables/primitives/definition'

/** @since 2.0.0 */
export const PrimitivesJsonSchema: WithPrimitives<JS.SchemableLambda> = {
  string: (params = {}) => JS.make(new JS.JsonString(params.minLength, params.maxLength)),
  int: (params = {}) => JS.make(new JS.JsonInteger(params.min, params.max)),
  float: (params = {}) => JS.make(new JS.JsonNumber(params.min, params.max)),
  boolean: JS.make(new JS.JsonBoolean()),
  unknown: JS.make(new JS.JsonEmpty()),
  literal: (...literals) =>
    JS.make(
      new JS.JsonUnion(
        literals.map(literal =>
          literal === null ? new JS.JsonNull() : { type: typeof literal, const: literal },
        ),
      ),
    ),
}

import * as JS from 'schemata-ts/internal/json-schema'
import { type WithArray } from 'schemata-ts/schemables/array/definition'

export const ArrayJsonSchema: WithArray<JS.SchemableLambda> = {
  array:
    (params = {}) =>
    item =>
      JS.make(new JS.JsonArray(item, params.minLength, params.maxLength)),
  tuple: (...items) => JS.make(new JS.JsonArray(items, items.length, items.length)),
}

import * as JS from 'schemata-ts/internal/json-schema'
import { makeImplicitOptional } from 'schemata-ts/internal/struct'
import { type WithOptional } from 'schemata-ts/schemables/optional/definition'

export const OptionalJsonSchema: WithOptional<JS.SchemableLambda> = {
  optional: (inner, _, { fallbackInput }) =>
    makeImplicitOptional(
      fallbackInput === undefined ? inner : JS.addDefault(fallbackInput)(inner),
      schema => Object.assign({}, schema),
    ),
}

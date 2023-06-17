import * as JS from 'schemata-ts/internal/json-schema'
import { WithOptional } from 'schemata-ts/schemables/optional/definition'
import { makeImplicitOptional } from 'schemata-ts/struct'

export const OptionalJsonSchema: WithOptional<JS.SchemableLambda> = {
  optional: inner => makeImplicitOptional(inner, schema => Object.assign({}, schema)),
}
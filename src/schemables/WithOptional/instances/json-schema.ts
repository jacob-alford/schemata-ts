import * as JS from 'schemata-ts/internal/json-schema'
import { WithOptional } from 'schemata-ts/schemables/WithOptional/definition'
import { makeImplicitOptional } from 'schemata-ts/struct'

export const WithOptionalJsonSchema: WithOptional<JS.SchemableLambda> = {
  optional: inner => makeImplicitOptional(inner, schema => Object.assign({}, schema)),
}

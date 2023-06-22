import { type SchemableLambda, makeTypeString } from 'schemata-ts/internal/type-string'
import { type WithOptional } from 'schemata-ts/schemables/optional/definition'
import { makeImplicitOptionalType } from 'schemata-ts/struct'

export const OptionalTypeString: WithOptional<SchemableLambda> = {
  optional: ([i, o]) => makeImplicitOptionalType(makeTypeString([`${i}?`, `${o}?`])),
}

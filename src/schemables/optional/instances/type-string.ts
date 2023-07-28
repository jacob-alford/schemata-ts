import { makeImplicitOptionalType } from 'schemata-ts/internal/struct'
import { type SchemableLambda, makeTypeString } from 'schemata-ts/internal/type-string'
import { type WithOptional } from 'schemata-ts/schemables/optional/definition'

export const OptionalTypeString: WithOptional<SchemableLambda> = {
  optional: ([i, o], _, { fallbackInput }) =>
    makeImplicitOptionalType(
      makeTypeString([`${i}?`, `${o}${fallbackInput === undefined ? '?' : ''}`]),
    ),
}

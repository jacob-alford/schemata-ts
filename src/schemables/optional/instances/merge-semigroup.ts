import * as MSg from 'schemata-ts/internal/merge-semigroup'
import { makeImplicitOptionalType } from 'schemata-ts/internal/struct'
import { type WithOptional } from 'schemata-ts/schemables/optional/definition'

export const OptionalMergeSemigroup: WithOptional<MSg.SchemableLambda> = {
  optional: msgA =>
    makeImplicitOptionalType(
      MSg.makeMergeSemigroup(
        concrete => (x, y) =>
          x === undefined
            ? y
            : y === undefined
            ? x
            : msgA.semigroup(concrete).concat(x, y),
      ),
    ),
}

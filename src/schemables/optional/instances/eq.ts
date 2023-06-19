import * as Eq from 'schemata-ts/internal/eq'
import { WithOptional } from 'schemata-ts/schemables/optional/definition'
import { makeImplicitOptionalType } from 'schemata-ts/struct'

export const OptionalEq: WithOptional<Eq.SchemableLambda> = {
  optional: eqA =>
    makeImplicitOptionalType({
      equals: (x, y) =>
        x === undefined ? y === undefined : y !== undefined && eqA.equals(x, y),
    }),
}

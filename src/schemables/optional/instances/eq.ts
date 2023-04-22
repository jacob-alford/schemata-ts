import * as Eq_ from 'schemata-ts/Eq'
import { WithOptional } from 'schemata-ts/schemables/optional/definition'
import { makeImplicitOptional } from 'schemata-ts/struct'

export const OptionalEq: WithOptional<Eq_.SchemableLambda> = {
  optional: eqA =>
    makeImplicitOptional(
      {
        equals: (x, y) =>
          x === undefined ? y === undefined : y !== undefined && eqA.equals(x, y),
      },
      val => Object.assign({}, val),
    ),
}

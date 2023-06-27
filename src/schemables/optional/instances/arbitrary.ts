import * as fc from 'fast-check'
import type * as Arb from 'schemata-ts/internal/arbitrary'
import { makeImplicitOptionalType } from 'schemata-ts/internal/struct'
import { type WithOptional } from 'schemata-ts/schemables/optional/definition'

export const OptionalArbitrary: WithOptional<Arb.SchemableLambda> = {
  optional: arbA => makeImplicitOptionalType(fc.oneof(arbA, fc.constant(undefined))),
}

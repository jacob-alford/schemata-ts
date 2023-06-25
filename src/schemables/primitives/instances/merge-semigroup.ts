import { constant } from 'fp-ts/function'
import * as MSg from 'schemata-ts/internal/merge-semigroup'
import { type WithPrimitives } from 'schemata-ts/schemables/primitives/definition'

/** @since 2.0.0 */
export const PrimitivesMergeSemigroup: WithPrimitives<MSg.SchemableLambda> = {
  string: constant(MSg.identity('string')),
  int: constant(MSg.identity('number')),
  float: constant(MSg.identity('number')),
  boolean: MSg.identity('boolean'),
  unknown: MSg.identity('unknown'),
  literal: constant(MSg.identity()),
}

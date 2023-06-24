import * as MSg from 'schemata-ts/internal/merge-semigroup'
import { type WithPrimitives } from 'schemata-ts/schemables/primitives/definition'

/** @since 2.0.0 */
export const PrimitivesMergeSemigroup: WithPrimitives<MSg.SchemableLambda> = {
  string: MSg.concrete,
  int: MSg.concrete,
  float: MSg.concrete,
  boolean: MSg.concrete(),
  unknown: MSg.concrete(),
  literal: MSg.concrete,
}

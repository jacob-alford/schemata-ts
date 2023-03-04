import * as B from 'fp-ts/boolean'
import { constant } from 'fp-ts/function'
import * as N from 'fp-ts/number'
import * as Str from 'fp-ts/string'
import * as Eq_ from 'schemata-ts/Eq'
import { WithPrimitives } from 'schemata-ts/schemables/WithPrimitives/definition'

/** @since 2.0.0 */
export const Eq: WithPrimitives<Eq_.SchemableLambda> = {
  string: constant(Str.Eq),
  int: constant(N.Eq),
  float: constant(N.Eq),
  boolean: B.Eq,
  unknown: Eq_.eqStrict,
  literal: constant(Eq_.eqStrict),
}

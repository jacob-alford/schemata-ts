import * as B from 'fp-ts/boolean'
import { constant } from 'fp-ts/function'
import * as N from 'fp-ts/number'
import * as Str from 'fp-ts/string'
import * as Eq from 'schemata-ts/internal/eq'
import { type WithPrimitives } from 'schemata-ts/schemables/primitives/definition'

export const PrimitivesEq: WithPrimitives<Eq.SchemableLambda> = {
  string: constant(Str.Eq),
  int: constant(N.Eq),
  float: (params = {}) => {
    const { epsilon } = params
    return Eq.fromEquals((x, y) => Math.abs(x - y) <= (epsilon ?? 2000 * Number.EPSILON))
  },
  boolean: B.Eq,
  unknown: Eq.fromEquals((x: unknown, y: unknown) =>
    Number.isNaN(x) && Number.isNaN(y) ? true : x === y,
  ),
  literal: constant(Eq.eqStrict),
}

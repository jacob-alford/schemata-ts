import * as Eq from 'fp-ts/Eq'
import { pipe } from 'fp-ts/function'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as Sg from 'fp-ts/Semigroup'
import * as Str from 'fp-ts/string'
import { type SchemableLambda, makeTypeString } from 'schemata-ts/internal/type-string'
import { type WithPrimitives } from 'schemata-ts/schemables/primitives/definition'
import {
  getLengthBoundsString,
  getNumberBoundsInt,
} from 'schemata-ts/schemables/primitives/utils'

export const PrimitivesTypeString: WithPrimitives<SchemableLambda> = {
  string: (params = {}) =>
    makeTypeString(`string${getLengthBoundsString(params, '<', '>')}`),
  int: (params = {}) => makeTypeString(`Integer${getNumberBoundsInt(params)}`),
  float: (params = {}) => makeTypeString(`Float${getNumberBoundsInt(params)}`),
  boolean: makeTypeString('boolean'),
  unknown: makeTypeString('unknown'),
  literal: (...items) =>
    pipe(
      items,
      RNEA.uniq(Eq.eqStrict),
      RNEA.foldMap(Sg.intercalate(' | ')(Str.Semigroup))(String),
      _ => makeTypeString(`${_}`),
    ),
}

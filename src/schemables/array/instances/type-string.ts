import { pipe } from 'fp-ts/function'
import * as Mn from 'fp-ts/Monoid'
import * as RA from 'fp-ts/ReadonlyArray'
import * as Str from 'fp-ts/string'
import { type SchemableLambda, makeTypeString } from 'schemata-ts/internal/type-string'
import { type WithArray } from 'schemata-ts/schemables/array/definition'
import { getLengthBoundsString } from 'schemata-ts/schemables/primitives/utils'

export const ArrayTypeString: WithArray<SchemableLambda> = {
  array:
    (params = {}) =>
    targetName =>
      makeTypeString(`Array${getLengthBoundsString(params, '[', ']')}<${targetName}>`),
  tuple: (...items) =>
    pipe(items, RA.intercalate(Mn.tuple(Str.Monoid, Str.Monoid))([',', ',']), ([i, o]) =>
      makeTypeString([`[${i}]`, `[${o}]`]),
    ),
}

import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RTup from 'fp-ts/ReadonlyTuple'
import * as Str from 'fp-ts/string'
import { type SchemableLambda, makeTypeString } from 'schemata-ts/internal/type-string'
import { type WithArray } from 'schemata-ts/schemables/array/definition'
import { getLengthBoundsString } from 'schemata-ts/schemables/primitives/utils'

export const ArrayTypeString: WithArray<SchemableLambda> = {
  array:
    params =>
    ([i, o]) =>
      makeTypeString([
        `Array${getLengthBoundsString(params, '[', ']')}<${i}>`,
        `Array${getLengthBoundsString(params, '[', ']')}<${o}>`,
      ]),
  tuple: (_, ...items) =>
    pipe(
      RA.unzip(items),
      RTup.bimap(RA.intercalate(Str.Monoid)(', '), RA.intercalate(Str.Monoid)(', ')),
      ([i, o]) => makeTypeString([`[${i}]`, `[${o}]`]),
    ),
}

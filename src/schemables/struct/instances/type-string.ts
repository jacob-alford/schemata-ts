import { flow, pipe, tuple } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as Ord from 'fp-ts/Ord'
import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RR from 'fp-ts/ReadonlyRecord'
import * as Sg from 'fp-ts/Semigroup'
import * as Str from 'fp-ts/string'
import { type SchemableLambda, makeTypeString } from 'schemata-ts/internal/type-string'
import { type WithStruct } from 'schemata-ts/schemables/struct/definition'
import { type UnionItem, remapPropertyKeys } from 'schemata-ts/schemables/struct/utils'

const ordUnionItemByInputKey: Ord.Ord<UnionItem<any>> = pipe(
  Str.Ord,
  Ord.contramap(_ => _.inputKey),
)

export const StructTypeString: WithStruct<SchemableLambda> = {
  struct: properties => {
    const remapped = remapPropertyKeys(properties)
    const inputStruct = pipe(
      properties,
      RR.collect(Str.Ord)((key, { schemable }) => tuple(key, schemable)),
      RNEA.fromReadonlyArray,
      O.fold(
        () => '{}',
        flow(
          RNEA.foldMap(Sg.intercalate(',\n  ')(Str.Semigroup))(
            ([key, [i]]) => `  ${key}${i.includes('?') ? '?' : ''}: ${i}`,
          ),
          _ => `{\n  ${_}\n}`,
        ),
      ),
    )
    const outputStruct = pipe(
      remapped,
      RR.collect(Str.Ord)((outputKey, unionItems) =>
        pipe(
          unionItems,
          RNEA.sort(ordUnionItemByInputKey),
          RNEA.group(ordUnionItemByInputKey),
          _ =>
            pipe(
              unionItems,
              RNEA.foldMap(Sg.intercalate(' | ')(Str.Semigroup))(
                ({ member: [, o], inputKey }) =>
                  _.length <= 1 || inputKey === outputKey ? o : `(:${inputKey})${o}`,
              ),
              unionString =>
                _.length === 1 &&
                RA.isNonEmpty(_) &&
                RNEA.head(_[0]).inputKey !== outputKey
                  ? `[${RNEA.head(_[0]).inputKey}->${outputKey}]: ${unionString}`
                  : `${outputKey}: ${unionString}`,
            ),
        ),
      ),
      RNEA.fromReadonlyArray,
      O.fold(
        () => '{}',
        flow(
          RNEA.foldMap(Sg.intercalate(',\n  ')(Str.Semigroup))(
            unionStr => `  ${unionStr}`,
          ),
          _ => `{\n  ${_}\n}`,
        ),
      ),
    )
    return makeTypeString([inputStruct, outputStruct])
  },
  record: ([ki, ko], [ai, ao]) =>
    makeTypeString([`Record<${ki}, ${ai}>`, `Record<${ko}, ${ao}>`]),
  intersection: ([ai, ao], [bi, bo]) =>
    makeTypeString([`${ai} & ${bi}`, `${ao} & ${bo}`]),
}

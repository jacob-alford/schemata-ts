/** @since 1.0.0 */
import type * as Ord from 'fp-ts/Ord'
import { deriveMergeSemigroup } from 'schemata-ts/derivations/merge-semigroup-schemable'
import { deriveTypeString } from 'schemata-ts/derivations/type-string-schemable'
import { type Schema, make } from 'schemata-ts/Schema'
import { ArrayTypeString } from 'schemata-ts/schemables/array/instances/type-string'

const { array, tuple } = ArrayTypeString

/**
 * A Schema for converting an array of key/value pairs to a map
 *
 * @since 1.0.0
 * @category Combinators
 */
export const MapFromEntries = <EK, EA, K extends EK, A>(
  ordK: Ord.Ord<K>,
  sK: Schema<EK, K>,
  sA: Schema<EA, A>,
  // istanbul ignore next
  mergeStrategy: 'first' | 'last' = 'last',
): Schema<ReadonlyArray<readonly [EK, EA]>, ReadonlyMap<K, A>> => {
  const tsA = deriveTypeString(sA)
  const arrayName = array({ expectedName: tsA[0] })(tuple('', deriveTypeString(sK), tsA))
  const mergeSemigroup = deriveMergeSemigroup(sA).semigroup(mergeStrategy)
  return make(S =>
    S.mapFromEntries(
      ordK,
      sK.runSchema(S),
      sA.runSchema(S),
      arrayName[0],
      mergeSemigroup,
    ),
  )
}

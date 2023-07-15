/** @since 1.4.0 */
import * as Sg from 'fp-ts/Semigroup'
import { getMergeSemigroup } from 'schemata-ts/derivations/merge-semigroup-schemable'
import { getTypeString } from 'schemata-ts/derivations/type-string-schemable'
import { type MergeStrategy } from 'schemata-ts/internal/merge-semigroup'
import { type Schema, make } from 'schemata-ts/Schema'
import { StructTypeString } from 'schemata-ts/schemables/struct/instances/type-string'

/**
 * A Typescript Record type with string-keys and known values.
 *
 * Additional parameter `mergeStrategy` determines how to merge values for when keys are
 * remapped to the same string
 *
 * @since 1.0.0
 * @category Combinators
 */
export const Record = <K extends string, I, O>(
  keys: Schema<K, K>,
  codomain: Schema<I, O>,
  mergeStrategy: 'first' | 'last' | MergeStrategy = 'last',
): Schema<Readonly<Record<K, I>>, Readonly<Record<K, O>>> => {
  const expectedName = StructTypeString.record(
    getTypeString(keys),
    getTypeString(codomain),
    'object',
    Sg.last(),
  )
  const valuesSemigroup = getMergeSemigroup(codomain).semigroup(mergeStrategy)
  return make(_ =>
    _.record(keys.runSchema(_), codomain.runSchema(_), expectedName[0], valuesSemigroup),
  )
}

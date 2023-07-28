/** @since 1.4.0 */
import * as Sg from 'fp-ts/Semigroup'
import { deriveMergeSemigroup } from 'schemata-ts/derivations/merge-semigroup-schemable'
import { deriveTypeString } from 'schemata-ts/derivations/type-string-schemable'
import { type MergeStrategy } from 'schemata-ts/internal/merge-semigroup'
import { make } from 'schemata-ts/internal/schema'
import { type Schema } from 'schemata-ts/Schema'
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
    deriveTypeString(keys),
    deriveTypeString(codomain),
    'object',
    Sg.last(),
  )
  const valuesSemigroup = deriveMergeSemigroup(codomain).semigroup(mergeStrategy)
  return make(_ =>
    _.record(keys.runSchema(_), codomain.runSchema(_), expectedName[0], valuesSemigroup),
  )
}

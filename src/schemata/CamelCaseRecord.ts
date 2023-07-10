/** @since 2.0.0 */
import { type MergeStrategy } from 'schemata-ts/internal/merge-semigroup'
import { type Schema } from 'schemata-ts/Schema'
import { type CamelCase, CamelCaseString } from 'schemata-ts/schemata/CamelCaseString'
import { Record } from 'schemata-ts/schemata/Record'

/**
 * A record combinator which converts the keys of a record to camel case.
 *
 * @since 2.0.0
 * @category Combinators
 */
export const CamelCaseRecord: <I, O>(
  codomain: Schema<I, O>,
  mergeStrategy?: MergeStrategy,
) => Schema<Readonly<Record<CamelCase, I>>, Readonly<Record<CamelCase, O>>> = (
  codomain,
  mergeStrategy,
) => Record(CamelCaseString(), codomain, mergeStrategy)

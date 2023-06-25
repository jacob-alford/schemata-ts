/**
 * A typeclass which models the `getSemigroup` operation that returns a merge-wise
 * semigroup for a particular domain type
 *
 * @since 2.0.0
 */

import { type Semigroup } from 'fp-ts/Semigroup'

// ------------------
// models
// ------------------

/**
 * Options for merging particular data types.
 *
 * Note: Imap, Unions, and Literals will always use the `fallback` strategy to maintain
 * associativity.
 *
 * @since 2.0.0
 */
export type MergeOptions = {
  readonly string?: Semigroup<string>
  readonly number?: Semigroup<number>
  readonly boolean?: Semigroup<boolean>
  readonly unknown?: Semigroup<unknown>
  readonly fallback: 'first' | 'last'
}

/**
 * Determines how concrete values are concatenated
 *
 * @since 2.0.0
 */
export type MergeStrategy = 'first' | 'last' | MergeOptions

/**
 * A typeclass which models the `getSemigroup` operation that returns a merge-wise
 * semigroup for a particular domain type
 *
 * Default merge strategy is `last`, i.e. overwrite
 *
 * @since 2.0.0
 * @category Model
 */
export interface MergeSemigroup<O> {
  readonly semigroup: (mergeStrategy?: MergeStrategy) => Semigroup<O>
}

// ------------------
// constructors
// ------------------

export {
  /**
   * Interprets a schema as a MergeSemigroup
   *
   * @since 2.0.0
   * @category Interpreters
   */
  getMergeSemigroup,
} from 'schemata-ts/derivations/merge-semigroup-schemable'

// ------------------
// instances
// ------------------

/**
 * @since 2.0.0
 * @category Instances
 */
export const URI = 'schemata-ts/MergeSemigroup'

/**
 * @since 2.0.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly [URI]: MergeSemigroup<A>
  }
}

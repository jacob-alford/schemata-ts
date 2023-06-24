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
 * A typeclass which models the `getSemigroup` operation that returns a merge-wise
 * semigroup for a particular domain type
 *
 * @since 2.0.0
 * @category Model
 */
export interface MergeSemigroup<O> {
  readonly semigroup: (concrete: Semigroup<unknown>) => Semigroup<O>
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

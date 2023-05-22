/**
 * Represents a typeclass and data-type that narrows an unknown value to a specific type
 * using Typescript type guards
 *
 * @since 2.0.0
 */
import * as hkt from 'schemata-ts/HKT'

// ------------------
// models
// ------------------

/**
 * Represents a typeclass and data-type that narrows an unknown value to a specific type
 *
 * @since 2.0.0
 * @category Model
 */
export interface Guard<A> {
  readonly is: (u: unknown) => u is A
}

// ------------------
// constructors
// ------------------

/**
 * Constructs a guard from predicate function
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromPredicate = <A>(predicate: (u: unknown) => u is A): Guard<A> => ({
  is: predicate,
})

// ------------------
// combinators
// ------------------

export {
  /**
   * Interprets a schema as a decoder
   *
   * @since 2.0.0
   * @category Interpreters
   */
  getGuard,
} from 'schemata-ts/derivations/guard-schemable'

// ------------------
// instances
// ------------------

/**
 * @since 2.0.0
 * @category Instances
 */
export const URI = 'schemata-ts/Guard'

/**
 * @since 2.0.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly [URI]: Guard<A>
  }
}

/**
 * @since 2.0.0
 * @category Type Lambdas
 */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Guard<this['Output']>
}

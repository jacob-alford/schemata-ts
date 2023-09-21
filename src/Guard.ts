/**
 * `Guard` is a data-type that narrows an unknown value to a specific type using
 * Typescript type guards
 *
 * @since 2.0.0
 */
import * as E from 'fp-ts/Either'
import { deriveTranscoder } from 'schemata-ts/derivations/transcoder-schemable'
import * as I from 'schemata-ts/internal/guard'
import { type Schema } from 'schemata-ts/Schema'

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
export const fromPredicate: <A>(predicate: (u: unknown) => u is A) => Guard<A> =
  I.fromPredicate

// ------------------
// combinators
// ------------------

export {
  /**
   * Interprets a schema as a guard for the `Output` type
   *
   * @since 2.0.0
   * @category Interpreters
   */
  deriveGuard,
} from 'schemata-ts/derivations/guard-schemable'

/**
 * Interprets a schema as a guard for the `Input` type
 *
 * @since 2.1.0
 * @category Interpreters
 */
export const deriveInputGuard = <I, O>(schema: Schema<I, O>): Guard<I> => {
  const transcoder = deriveTranscoder(schema)
  return {
    is: (u): u is I => E.isRight(transcoder.decode(u)),
  }
}

// ------------------
// instances
// ------------------

/**
 * @since 2.0.0
 * @category URI
 */
export const URI = 'schemata-ts/Guard'

/**
 * @since 2.0.0
 * @category URI
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly [URI]: Guard<A>
  }
}

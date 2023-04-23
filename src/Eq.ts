/**
 * Represents a typeclass and data type that determines if two values of the same type are
 * equal, and follows the following laws:
 *
 * 1. Reflexivity: `x === x`
 * 2. Symmetry: `x === y <=> y === x`
 * 3. Transitivity: `x === y && y === z => x === z`
 *
 * @since 2.0.0
 */
import { Contravariant1 } from 'fp-ts/Contravariant'
import { Invariant1 } from 'fp-ts/Invariant'
import { Monoid } from 'fp-ts/Monoid'
import * as hkt from 'schemata-ts/HKT'
import * as I from 'schemata-ts/internal/eq'

/**
 * Represents a typeclass and data type that determines if two values of the same type are
 * equal, and follows the following laws:
 *
 * 1. Reflexivity: `x === x`
 * 2. Symmetry: `x === y <=> y === x`
 * 3. Transitivity: `x === y && y === z => x === z`
 *
 * @since 2.0.0
 */
export interface Eq<A> {
  readonly equals: (x: A, y: A) => boolean
}

// ------------------
// constructors
// ------------------

/**
 * @since 2.0.0
 * @category Constructors
 */
export const fromEquals: <A>(equals: (x: A, y: A) => boolean) => Eq<A> = I.fromEquals

// ------------------
// combinators
// ------------------

export {
  /**
   * Interprets a schema as an `Eq` instance.
   *
   * @since 2.0.0
   * @category Interpreters
   */
  getEq,
} from 'schemata-ts/derivations/eq-schemable'

// ------------------
// instances
// ------------------

/**
 * @since 2.0.0
 * @category Instances
 */
export const URI = I.URI

/**
 * @since 2.0.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly [URI]: Eq<A>
  }
}

/**
 * @since 2.0.0
 * @category Type Lambdas
 */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Eq<this['Output']>
}

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => (fa: Eq<A>) => Eq<B> = I.imap

/**
 * @since 2.0.0
 * @category Instances
 */
export const Invariant: Invariant1<URI> = I.Invariant

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const contramap: <A, B>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B> = I.contramap

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const Contravariant: Contravariant1<URI> = I.Contravariant

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const and: <A>(that: Eq<A>) => (self: Eq<A>) => Eq<A> = I.and

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const always: Eq<unknown> = I.always

/**
 * @since 2.0.0
 * @category Instances
 */
export const getMonoidAll: <A>() => Monoid<Eq<A>> = I.getMonoidAll

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const or: <A>(that: Eq<A>) => (self: Eq<A>) => Eq<A> = I.or

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const never: Eq<unknown> = I.never

/**
 * @since 2.0.0
 * @category Instances
 */
export const getMonoidAny: <A>() => Monoid<Eq<A>> = I.getMonoidAny

/**
 * @since 2.0.0
 * @category Instances
 */
export const eqStrict: Eq<unknown> = I.eqStrict

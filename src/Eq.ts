/**
 * Eq is a data type that determines if two values of the same type are equal, and abides
 * the following laws:
 *
 * 1. Reflexivity: `x === x`
 * 2. Symmetry: `x === y <=> y === x`
 * 3. Transitivity: `x === y && y === z => x === z`
 *
 * @since 2.0.0
 */
import { type Contravariant1 } from 'fp-ts/Contravariant'
import { constTrue } from 'fp-ts/function'
import { type Invariant1 } from 'fp-ts/Invariant'
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
 * @category Model
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
  deriveEq,
} from 'schemata-ts/derivations/eq-schemable'

// ------------------
// instances
// ------------------

/**
 * @since 2.0.0
 * @category URI
 */
export const URI = 'schemata-ts/Eq'

/**
 * @since 2.0.0
 * @category URI
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly [URI]: Eq<A>
  }
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
// istanbul ignore next
export const Invariant: Invariant1<URI> = {
  URI,
  imap: (fa, f, g) => imap(f, g)(fa),
}

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const contramap: <A, B>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B> = I.contramap

/**
 * @since 2.0.0
 * @category Instances
 */
// istanbul ignore next
export const Contravariant: Contravariant1<URI> = {
  URI,
  contramap: (fa, f) => contramap(f)(fa),
}

/**
 * @since 2.0.0
 * @category Combinators
 */
export const and: <A>(that: Eq<A>) => (self: Eq<A>) => Eq<A> = that => self => ({
  equals: (x, y) => self.equals(x, y) && that.equals(x, y),
})

/**
 * @since 2.0.0
 * @category Instances
 */
export const always: Eq<unknown> = {
  equals: constTrue,
}

/**
 * @since 2.0.0
 * @category Combinators
 */
export const or: <A>(that: Eq<A>) => (self: Eq<A>) => Eq<A> = that => self => ({
  equals: (x, y) => self.equals(x, y) || that.equals(x, y),
})

/**
 * @since 2.0.0
 * @category Instances
 */
export const eqStrict: Eq<unknown> = I.eqStrict

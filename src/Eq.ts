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
export const fromEquals = (equals: Eq<any>['equals']): Eq<any> => ({
  equals: (x, y) => x === y || equals(x, y),
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
  getEq,
} from 'schemata-ts/derivations/EqSchemable'

// ------------------
// instances
// ------------------

/**
 * @since 2.0.0
 * @category Instances
 */
export const URI = 'schemata-ts/Encoder'

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
export interface TypeLambda extends hkt.TypeLambda {
  readonly type: Eq<this['Target']>
}

/**
 * @since 2.0.0
 * @category Type Lambdas
 */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Eq<this['Output']>
}

// non-pipeables
const contramap_: Contravariant1<URI>['contramap'] = (fa, f) =>
  fromEquals((x, y) => fa.equals(f(x), f(y)))
const imap_: Invariant1<URI>['imap'] = (fa, _, g) => contramap_(fa, g)

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => (fa: Eq<A>) => Eq<B> =
  (f, g) => fa =>
    imap_(fa, f, g)

/**
 * @since 2.0.0
 * @category Instances
 */
export const Invariant: Invariant1<URI> = {
  URI,
  imap: imap_,
}

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const contramap: <A, B>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B> = f => fa =>
  contramap_(fa, f)

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const Contravariant: Contravariant1<URI> = {
  URI,
  contramap: contramap_,
}

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const and: <A>(that: Eq<A>) => (self: Eq<A>) => Eq<A> = that => self =>
  fromEquals((x, y) => self.equals(x, y) && that.equals(x, y))

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const always: Eq<unknown> = fromEquals(() => true)

/**
 * @since 2.0.0
 * @category Instances
 */
export const getMonoidAll = <A>(): Monoid<Eq<A>> => ({
  concat: (x, y) => and(x)(y),
  empty: always,
})

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const or: <A>(that: Eq<A>) => (self: Eq<A>) => Eq<A> = that => self =>
  fromEquals((x, y) => self.equals(x, y) || that.equals(x, y))

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const never: Eq<unknown> = fromEquals(() => false)

/**
 * @since 2.0.0
 * @category Instances
 */
export const getMonoidAny = <A>(): Monoid<Eq<A>> => ({
  concat: (x, y) => or(x)(y),
  empty: never,
})

/**
 * @since 2.0.0
 * @category Instances
 */
export const eqStrict: Eq<unknown> = {
  equals: (x, y) => x === y,
}

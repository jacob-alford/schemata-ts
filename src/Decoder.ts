/**
 * A decoder is a typeclass and data-type for parsing unknown values and transforming them
 *
 * @since 2.0.0
 */
import { Alt1 } from 'fp-ts/Alt'
import * as E from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'
import { Functor1 } from 'fp-ts/Functor'
import { Invariant1 } from 'fp-ts/Invariant'
import { ReadonlyNonEmptyArray } from 'fp-ts/ReadonlyNonEmptyArray'
import { DecodeError } from 'schemata-ts/DecodeError'
import { Guard } from 'schemata-ts/Guard'
import * as hkt from 'schemata-ts/HKT'

// ------------------
// models
// ------------------

/**
 * @since 2.0.0
 * @category Model
 */
export interface Decoder<A> {
  readonly decode: (u: unknown) => E.Either<ReadonlyNonEmptyArray<DecodeError>, A>
}

// ------------------
// constructors
// ------------------

/**
 * Constructs a decoder from a guard
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromGuard: <A>(
  guard: Guard<A>,
  onError: (u: unknown) => ReadonlyNonEmptyArray<DecodeError>,
) => Decoder<A> = (guard, onError) => ({
  decode: E.fromPredicate(guard.is, onError),
})

// ------------------
// instances
// ------------------

/**
 * @since 2.0.0
 * @category Instances
 */
export const URI = 'schemata-ts/Decoder'

/**
 * @since 2.0.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly [URI]: Decoder<A>
  }
}

/**
 * @since 2.0.0
 * @category Type Lambdas
 */
export interface TypeLambda extends hkt.TypeLambda {
  readonly type: Decoder<this['Target']>
}

/**
 * @since 2.0.0
 * @category Type Lambdas
 */
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Decoder<this['Output']>
}

// non-pipeables
const map_: Functor1<URI>['map'] = (fa, f) => ({
  decode: flow(fa.decode, E.map(f)),
})
const alt_: Alt1<URI>['alt'] = (fa, that) => ({
  decode: u =>
    pipe(
      fa.decode(u),
      E.alt(() => that().decode(u)),
    ),
})

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const imap: <A, B>(
  f: (a: A) => B,
  g: (b: B) => A,
) => (fa: Decoder<A>) => Decoder<B> = f => fa => map_(fa, f)

/**
 * @since 2.0.0
 * @category Instances
 */
export const Invariant: Invariant1<URI> = {
  URI,
  imap: map_,
}

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Decoder<A>) => Decoder<B> = f => fa =>
  map_(fa, f)

/**
 * @since 2.0.0
 * @category Instances
 */
export const Functor: Functor1<URI> = {
  URI,
  map: map_,
}

/**
 * @since 2.0.0
 * @category Instance Methods
 */
export const alt: <A>(that: () => Decoder<A>) => (fa: Decoder<A>) => Decoder<A> =
  that => fa =>
    alt_(fa, that)

/**
 * @since 2.0.0
 * @category Instances
 */
export const Alt: Alt1<URI> = {
  ...Functor,
  alt: alt_,
}

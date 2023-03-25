/**
 * A decoder is a typeclass and data-type for parsing unknown values and transforming them
 *
 * @since 2.0.0
 */
import { Alt1 } from 'fp-ts/Alt'
import * as E from 'fp-ts/Either'
import { Lazy } from 'fp-ts/function'
import { Functor1 } from 'fp-ts/Functor'
import { Invariant1 } from 'fp-ts/Invariant'
import { NaturalTransformation11 } from 'fp-ts/NaturalTransformation'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as DE from 'schemata-ts/DecodeError'
import * as G from 'schemata-ts/Guard'
import * as hkt from 'schemata-ts/HKT'

// ------------------
// models
// ------------------

/**
 * @since 2.0.0
 * @category Model
 */
export interface Decoder<A> {
  readonly decode: (u: unknown) => E.Either<DE.DecodeErrors, A>
}

// ------------------
// constructors
// ------------------

/**
 * @since 2.0.0
 * @category Constructors
 */
export const success: <A>(a: A) => E.Either<DE.DecodeErrors, A> = E.right

/**
 * @since 2.0.0
 * @category Constructors
 */
export const failure: <A>(e: DE.DecodeErrors) => E.Either<DE.DecodeErrors, A> =
  E.throwError

/**
 * A collection of failure cases
 *
 * @since 2.0.0
 * @category Constructors
 */
export const decodeErrors = (
  ...errors: RNEA.ReadonlyNonEmptyArray<DE.DecodeError>
): DE.DecodeErrors => new DE.DecodeErrors(errors)
/**
 * A failure case for a value that does not match the expected type
 *
 * @since 2.0.0
 * @category Constructors
 */
export const typeMismatch = (
  ...args: ConstructorParameters<typeof DE.TypeMismatch>
): DE.DecodeError => new DE.TypeMismatch(...args)

/**
 * A failure case for an unexpected value
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unexpectedValue = (
  ...args: ConstructorParameters<typeof DE.UnexpectedValue>
): DE.DecodeError => new DE.UnexpectedValue(...args)

/**
 * A failure case at a specific index
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtIndex = (
  ...args: ConstructorParameters<typeof DE.ErrorAtIndex>
): DE.DecodeError => new DE.ErrorAtIndex(...args)

/**
 * A failure case at a specific key
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtKey = (
  ...args: ConstructorParameters<typeof DE.ErrorAtKey>
): DE.DecodeError => new DE.ErrorAtKey(...args)

/**
 * A failure case for a union member
 *
 * @since 2.0.0
 * @category Constructors
 */
export const errorAtUnionMember = (
  ...args: ConstructorParameters<typeof DE.ErrorAtUnionMember>
): DE.DecodeError => new DE.ErrorAtUnionMember(...args)

// ------------------
// combinators
// ------------------

// export {
//   /**
//    * Interprets a schema as a decoder
//    *
//    * @since 2.0.0
//    * @category Interpreters
//    */
//   getDecoder,
// } from 'schemata-ts/derivations/DecoderSchemable'

// ------------------
// natural transformations
// ------------------

/**
 * Constructs a decoder from a guard
 *
 * @since 2.0.0
 * @category Natural Transformations
 */
export const fromGuard: (
  onError: (u: unknown) => DE.DecodeErrors,
) => NaturalTransformation11<G.URI, URI> = onError => guard => ({
  decode: E.fromPredicate(guard.is, onError),
})

/**
 * Constructs a decoder from a predicate
 *
 * @since 2.0.0
 * @category Natural Transformations
 */
export const fromPredicate: <A>(
  predicate: (u: unknown) => u is A,
  onError: (u: unknown) => DE.DecodeErrors,
) => Decoder<A> = (predicate, onError) => ({
  decode: E.fromPredicate(predicate, onError),
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
export interface SchemableLambda extends hkt.SchemableLambda {
  readonly type: Decoder<this['Output']>
}

// non-pipeables
const map_: Functor1<URI>['map'] = (fa, f) => ({
  decode: u => E.Functor.map(fa.decode(u), f),
})
const alt_ = <A>(self: Decoder<A>, that: Lazy<Decoder<A>>): Decoder<A> => ({
  decode: u => E.Alt.alt(self.decode(u), () => that().decode(u) as any),
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
  that => self =>
    alt_(self, that)

/**
 * @since 2.0.0
 * @category Instances
 */
export const Alt: Alt1<URI> = {
  ...Functor,
  alt: alt_,
}
